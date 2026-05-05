# Agent Rules

## Documentation Rules

- Keep API README examples focused on core endpoint usage.
- Follow the implemented API surface exactly; do not document unsupported methods.
- Do not add optional query-parameter examples for list endpoints unless the user explicitly asks for them.
- If optional parameters are not requested, provide only the basic list example.
- Use resource-specific naming consistently in README titles, descriptions, and examples.
- Keep examples practical and minimal: one clear snippet per method is preferred.
- When documenting nested resources, always include parent identifiers in examples (for example: automationId, actionId).

## Resource Implementation Rules

- Keep endpoint methods aligned to the API contract in path shape, HTTP method, and return type.
- Prefer consistent HTTP method casing across resource classes.
- Return `response.data` for entity methods (`get`, `create`, `update`, `count`) unless the API intentionally returns full response metadata.
- Return full response for list methods when pagination metadata is part of the contract.
- Keep method names CRUD-oriented and predictable: `list`, `get`, `create`, `update`, `delete`, plus resource-specific methods where needed.

## Integration Test Rules

- Use Vitest with clear suite names and method-focused test names.
- Reuse project helpers from `@lib` for setup operations (`simpleOmneoRequest`, `simpleIDRequest`, random string helpers).
- For ID tests, use `testWithIDData` to obtain profile/token context instead of duplicating auth setup.
- Create required test resources explicitly before assertions, and keep assertions tied to those created resources.
- Clean up only resources created by the test in `afterAll`.
- When suitable, prefer a GET-first setup strategy (reuse existing definitions); create only when missing.

## Consistency Rules

- Mirror existing directory and file naming patterns for new tests and docs.
- Preserve existing alias usage (`@omneo`, `@id`, `@types`, `@lib`) in test and implementation code.
- Avoid introducing new patterns when an established project pattern already exists.
