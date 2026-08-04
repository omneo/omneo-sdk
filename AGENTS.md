# AGENTS.md — omneo-sdk

Guidance for AI agents (and new contributors) working in this repository. It is
prescriptive: where the existing code is inconsistent, this file states the
canonical style for **new** code. Match older variants only when editing inside
a file that already uses them.

## Project overview

`@omneo/omneo-sdk` is a zero-runtime-dependency TypeScript SDK for the Omneo
platform. It relies on global `fetch`/`Headers` (Node >= 20) — no axios, no
HTTP wrapper library. Built with tsup to CJS + ESM + declaration files.

The public API surface is exactly three things, exported from `src/index.ts`:

```ts
export * from './types'
export { Omneo } from './omneo'
export { ID } from './id'
```

Two client classes, one package:

| Client | File | Base URL | Auth | Scope |
|---|---|---|---|---|
| `Omneo` | `src/omneo/index.ts` | `https://api.${tenant}.getomneo.com/api/v3` | long-lived bearer `token` | Admin/server API — ~58 resources covering the whole platform |
| `ID` | `src/id/index.ts` | `https://api.${tenant}.getomneo.com/id/api/v1` | short-lived per-profile `IDToken` | Customer-facing API — `auth` + `profile`, where `profile` mirrors the admin `profiles` sub-resource tree with every endpoint under `/profiles/me` (no profile id arguments) |

Individual resource classes are **not** exported publicly — they are reachable
only as instance properties (`omneo.brands.get(1)`). Both clients expose
`call({ method, endpoint, params?, body?, headers? })` as the escape hatch for
unsupported endpoints.

## Repository map

| Path | Purpose |
|---|---|
| `src/omneo/resources/<kebab-name>/index.ts` | Admin resources (some with nested sub-resource dirs) |
| `src/omneo/resources/resource.ts` | Thin base `Resource` class (holds `client: Omneo`) |
| `src/id/resources/{auth,profile}/…` | ID resources; `profile` has ~25 sub-resources |
| `src/id/resources/resource.ts` | Base `IDResource` class |
| `src/types/` | All shared types, one kebab-case file per domain, barrel at `src/types/index.ts` |
| `src/tests/integration/{omneo,id}/` | Vitest integration tests (live API — see Testing) |
| `src/tests/lib/` | Test helpers, imported as `@lib` |
| `src/tests/mocks/` | Static fixture data (NOT HTTP mocks, despite the name) |
| `sample/sample.ts` | Dev scratchpad for hitting the SDK manually |
| `dist/` | Build output (gitignored) |

Path aliases (`@/*`, `@omneo`, `@id`, `@types`, `@lib`) are declared in **both**
`tsconfig.json` `paths` and `vitest.config.ts` `resolve.alias` — if you add or
change one, keep the two in sync.

## Commands

| Goal | Command | Notes |
|---|---|---|
| Build | `npm run build` | tsup CJS+ESM+dts; config lives entirely in the script flags — there is no `tsup.config.ts` |
| Build watch | `npm run watch` | This watches the **build**, not tests |
| Lint | `npm run lint` | ESLint is the only formatter — no prettier/biome/editorconfig |
| Lint + fix | `npm run lint-fix` | |
| Targeted tests | `npx vitest run <file-or-dir>` | The only safe way to run tests — see Testing |
| Full test suite | `npm test` | ⚠️ Fires ~262 live-API test files at the tenant in `.env`. **Do not run unless explicitly asked.** |
| Sample scratchpad | `npm run sample` | Requires `tsx`, which is currently not in devDependencies |

There is no typecheck script; the closest is `npm run build` (tsup emits
declarations). The `eslint` script (`eslint index.ts`) targets a nonexistent
file — use `lint`/`lint-fix`.

## Architecture and the resource pattern

### Composition

The client classes are the composition root. Every resource is instantiated as
a `public` class property: `public camelCasePlural = new PascalClass(this)`.
The property list in `Omneo` is **alphabetised with blank lines grouping letter
runs** — a new resource must slot into its alphabetical position. (`health` is
the one function-style exception: `public health = health.bind(this)`.)

Sub-resources are composed the same way one level down, receiving
`this.client`:

```ts
export default class Transactions extends Resource {
  customFields = new TransactionCustomFields(this.client)
  items = new TransactionItems(this.client)
}
```

The base classes are trivially thin — no shared HTTP helpers. All requests go
through `this.client.call(...)`.

### Canonical resource shape

`src/omneo/resources/brands/index.ts` is the cleanest exemplar of the shape.
The canonical template for a **new** resource (uppercase HTTP methods — see
Code style):

```ts
import { RequestParams, Brand, BrandInput, BrandResponse } from '@types'
import Resource from '../resource.js'

export default class Brands extends Resource {
  get (id: number, params?: RequestParams): Promise<Brand> {
    return this.client.call({
      method: 'GET',
      endpoint: `/brands/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<BrandResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/brands',
      params
    })
  }

  create (body: BrandInput): Promise<Brand> { /* POST, unwrap .data */ }
  update (id: number, body: Partial<BrandInput>): Promise<Brand> { /* PUT, unwrap .data */ }
  delete (id: number): Promise<void> { /* DELETE, no unwrap */ }
}
```

Rules encoded in that shape:

- `export default class X extends Resource`, PascalCase pluralised class name,
  no constructor of its own. Sub-resource classes are prefixed with their
  parent scope (`TransactionItems`, `ProfileAttributesCustom`).
- Method names: `get` / `list` / `create` / `update` / `delete`; non-CRUD
  actions get camelCase verbs (`resync`, `merge`, `findByEmail`,
  `checkAvailability`, `triggerCustomEvent`).
- Signature order: path ids first, then `body`, then `params?` (always typed
  `RequestParams`).
- `get`/`create`/`update` unwrap the envelope with
  `.then((response) => { return response.data })` — explicit block body with
  `return`, not a concise arrow.
- `list` returns the **full envelope** (`EntityResponse` = pagination links,
  meta and `data`) and never unwraps. Non-paginated list endpoints return
  `Promise<Entity[]>` and unwrap, with a `// Not Paginated` comment.
- Update payloads are `Partial<XInput>` unless a dedicated `UpdateXInput`
  exists.
- Composite custom-field keys are built as a named local on its own line:
  `` const attribute = `${namespace}:${handle}` ``.
- Pagination is manual/pass-through: callers supply `page[size]` /
  `page[number]` and Laravel-style bracket filters (`'filter[email]': email`)
  in `params`. There is no auto-paginating iterator — do not add one to a
  single resource ad hoc.

### The ID mirror rule

A change to an admin resource almost always needs a mirrored change in
`src/id/resources/profile/<same-name>/index.ts` — same shape, minus the
profile id arguments (everything is `/profiles/me/...`). Mirror the READMEs
and tests too (see the checklist below).

### File and directory naming

- Resource directories: kebab-case, pluralised, matching the API path segment
  (`achievement-definitions`, `custom-fields`).
- Every resource implementation is `index.ts` inside its own directory —
  resource dirs are not barrels; `index.ts` *is* the implementation.
- Imports: types always `from '@types'`; base class `from '../resource.js'`
  (with the `.js` extension, correct for `nodenext` resolution) — except
  inside the deep `profiles`/`profile` trees, where the local norm is the
  alias form (`'@omneo/resources/resource'` / `'@id/resources/resource'`).

## Types (`src/types/`)

- One kebab-case file per domain; every new file must be added to the barrel
  `src/types/index.ts` (a flat list of `export * from './x'` lines).
- **Use `type` aliases, never `interface`** (369 `export type` vs 2 legacy
  interfaces in the codebase).
- Naming triad per entity, modelled on `src/types/brands.ts`:
  - `Entity` — the API resource shape, snake_case fields matching the API
    verbatim, nullability spelled out explicitly (`external_id: string | null`).
  - `EntityInput` — derived from the entity, not hand-written:
    `Partial<Omit<Entity, 'id' | 'created_at' | 'updated_at'>> & { handle: Entity['handle'] }`.
    Use `CreateEntityInput`/`UpdateEntityInput` only when create and update
    genuinely differ.
  - `EntityResponse` — always `PaginationResponse & { data: Entity[] }`.
- Enums are inline string-literal unions, extracted to a named type when
  reused (`export type ProfileType = 'temporary' | 'dependant' | …`).
- Open-ended blobs are `{ [key: string]: any }` (the codebase never uses
  `Record<string, unknown>`); `meta` objects list known keys plus an index
  signature.
- **No generics anywhere.** `client.call` returns `Promise<any>`; each
  resource method annotates its own concrete return type. Follow that —
  don't introduce a generic `call<T>`.

## Code style

ESLint extends `eslint-config-standard` (JS Standard Style) with zero rule
overrides. There is no prettier. In practice:

- Single quotes; template literals for interpolation.
- **No semicolons.**
- 2-space indent; no trailing commas; `===`; object literals broken one
  property per line.
- **Space before function parens** — `get (id: number, params?: RequestParams)`,
  `constructor (options: OmneoClassOptions)`. This is the easiest rule to get
  wrong when writing TypeScript from muscle memory.
- **Promise chains, not async/await, inside resource methods.** There are zero
  `async` resource methods; `async/await` appears only in the clients' `call`
  implementations, standalone helpers, and test files.
- Conditional spread for optional request fields:
  `...(body && { body: JSON.stringify(body) })`.
- `Promise.reject(new Error(...))` for failures in async paths;
  `throw Error(...)` in sync helpers.
- **No JSDoc.** Method documentation lives in the per-resource `README.md`
  (see below). Inline `//` comments are reserved for API quirks
  (`// Omneo API bug cannot accept null`, `// Not Paginated`).

Canonical choices where existing code is split — use these in new code:

| Topic | Canonical | Legacy variants you'll see |
|---|---|---|
| HTTP method strings | `'GET'` / `'POST'` / `'PUT'` / `'DELETE'` (uppercase) | lowercase `'get'` etc. (~50% of older code) |
| Base `Resource` import | `'../resource.js'` (or the alias form inside the profiles trees) | extensionless `'../resource'` |
| `list()` return | full envelope, no unwrap | a few files unwrap `.data` |
| Boolean type | lowercase `boolean` | boxed `Boolean` in a few option/return spots |

## Testing

> ⚠️ **Every test in this repo is a live integration test.** All ~262
> `*.test.ts` files create, update and delete real data against the tenant in
> `.env` over the network. There is no HTTP mocking anywhere (`src/tests/mocks/`
> is static fixture data, not mocks). Commit messages calling them "unit tests"
> are a misnomer.
>
> **Run only the test files relevant to your change**, e.g.
> `npx vitest run src/tests/integration/omneo/tier-definitions/`.
> Never run `npm test` (the full suite) unless the user explicitly asks.

- Framework: Vitest, globals **off** — every file imports what it uses:
  `import { describe, expect, test, afterAll } from 'vitest'`. Use `test()`
  exclusively; `it()` appears nowhere.
- Layout mirrors the resource tree: `src/tests/integration/omneo/<resource>/`
  and `src/tests/integration/id/profile/<resource>/`, one file per operation,
  named `<verb>-<resource>.test.ts` (prefixed `id-` in the id tree). Always
  `.test.ts`, never `.spec.ts`.
- Anatomy of a test (see
  `src/tests/integration/omneo/tier-definitions/create-tier-definition.test.ts`):
  1. Module-scope client:
     `new Omneo({ tenant: process.env.OMNEO_TENANT as string, token: process.env.OMNEO_TOKEN as string })`.
  2. SCREAMING_SNAKE tracking array for teardown:
     `const CREATED_TIER_DEFINITION_IDS: number[] = []`.
  3. `describe('<Human Phrase>')`; test names start `'SDK ...'` (or
     `'ID SDK ...'` in the id tree).
  4. Unique payload values via `getRandomString('sdk_unit_test_...')` from `@lib`.
  5. SDK call with the log-and-rethrow idiom:
     `.catch((err) => { console.error('... failed:', err); throw new Error('... failed') })`.
  6. Flat round-trip assertions: `expect(x).toBeDefined()` then
     `expect(x.field).toBe(payload.field)` per field; `toHaveProperty` for
     shape-only checks.
  7. `afterAll` **outside** the `describe`, deleting tracked ids via the raw
     `simpleOmneoRequest('DELETE', ...)` helper — deliberately bypassing the
     SDK so cleanup can't be masked by SDK bugs — logging (not asserting) the
     outcome.
- ID-tree tests use the `testWithIDData` fixture
  (`src/tests/integration/id/test-with-id-data.ts`), which provides
  `{ profile, tokenData }`; construct the `ID` client inside the test with
  `IDToken: tokenData.token`. Seed prerequisite data with the raw helpers
  (`simpleOmneoRequest`/`simpleIDRequest`), not the SDK under test.
- Env vars: `OMNEO_TENANT` and `OMNEO_TOKEN` (in `.env.example`), plus
  `OMNEO_TEST_PROFILE_ID`, `OMNEO_TEST_PRODUCT_ID`,
  `OMNEO_TEST_PRODUCT_VARIANT_ID`, `OMNEO_TEST_LOCATION_ID` used by many tests
  but absent from `.env.example`. All `.env` vars are injected via
  `vitest.config.ts` (`loadEnv` with no prefix filter). Test timeout is 40s.

## Per-resource README convention

Every resource directory ships a hand-written colocated `README.md`:

- `## <Resource>` heading, one `### <Verb Resource>` section per method.
- One ```javascript fence per method showing usage as
  `omneoClient.<accessor>.<method>(...).then(...).catch(...)`, with 4-space
  indent inside the fence.
- Parent resources with children (e.g. `profiles`) carry a table of contents
  linking to child READMEs.

When you add or change a method, update the README in the same directory —
and its mirror in the other tree if the resource is mirrored.

## Adding a new resource — full checklist

1. `src/omneo/resources/<kebab-name>/index.ts` — resource class per the
   canonical shape above.
2. Register it on the `Omneo` class as a `public camelCasePlural` property in
   **alphabetical position**.
3. Types triad in a new `src/types/<kebab-name>.ts`, added to the
   `src/types/index.ts` barrel.
4. `src/omneo/resources/<kebab-name>/README.md` per the README convention.
5. If the resource exists on the customer surface: mirror under
   `src/id/resources/profile/<kebab-name>/index.ts` (no id args), register it
   on the `profile` resource, and add its README.
6. Tests: one file per operation under `src/tests/integration/omneo/<kebab-name>/`
   (and `src/tests/integration/id/profile/<kebab-name>/` if mirrored), with
   `afterAll` cleanup.

## Git, CI and release

- **Angular conventional commits, enforced** by the husky `commit-msg` hook +
  commitlint. Allowed types: `build, ci, docs, feat, fix, perf, refactor,
  revert, style, test, chore`. Header ≤ 72 chars. Scopes are unused in
  practice (`feat: add integration tests for profile tiers`).
- Branches: feature branches `feat/<kebab-slug>` / `fix/<kebab-slug>` PR into
  `develop`; `develop` is promoted to `master`, which triggers
  **semantic-release** (publish to npm, GitHub release, CHANGELOG commit).
- **Never hand-edit `package.json` `version` or `CHANGELOG.md`** — both are
  machine-owned by semantic-release on `master`.
- CI: `lint.yml` runs `npm run lint` on every PR; `test.yml` runs the full
  live suite (Node 20, repo secrets) on pushes to non-master branches and PRs
  into master. There are no pre-commit/pre-push hooks — only `commit-msg`.
- Merge style: GitHub merge commits (not squash/rebase).

## Known issues — do not replicate, do not "fix" unprompted

These exist in the codebase today. Don't copy them into new code; don't fix
them as a drive-by either — they may have downstream consumers relying on
current behaviour. Raise them separately if relevant.

- **Error-shape asymmetry**: `Omneo.call` rejects with the parsed response
  body; `ID.call` rejects with the raw `Response`. Callers probe defensively
  (`error?.errors || error?.body?.errors`).
- `ID.call` ignores the `headers` field of `OmneoRequest` (only `Omneo.call`
  merges custom headers).
- `OmneoProfile.Connection(connectionID)` monkey-patches `call` on the
  **shared** client instance, leaking the endpoint rewrite onto the original.
- Naming slips: `Omneo.saveFilters` (should be `savedFilters`),
  `Currency` class on the `currencies` property, singular `reminder/` dir for
  `Reminders`, `ID.profile` exports `class OmneoProfile`.
- Wrong/placeholder annotations: `ProfileAttributesCustom.delete` typed
  `Promise<Response>` (id-side `Promise<Address>`); `TransactionItems.list`
  hits a literal un-substituted `'/transactions/:transactionsId/items'`;
  `ProfileTransactions.getGrouped` spreads `page[...]` params onto the request
  root where they're silently dropped.
- Boxed `Boolean` type in a few option/return positions.
- `package.json` has `"engine"` (singular — inert; npm's field is `engines`),
  an empty `description`, `@types/node` (v18) in runtime `dependencies`, and
  no `exports` map despite emitting `.mjs`.
- `Resource.init?()` is a dead extension point — no resource implements it.
- `src/types/general.ts` and `src/types/payment.ts` are missing from the types
  barrel (publicly unreachable).
- A few type files leak semicolons/4-space indent (`webhooks.ts`, parts of
  `transaction.ts`, `achievement.ts`).
- Some tests mutate `process.env.TZ` in `beforeAll` — a cross-file race under
  Vitest's parallel execution; another reason to run tests targeted, not all
  at once.
