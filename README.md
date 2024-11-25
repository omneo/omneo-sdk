# Omneo JS SDK

[![Version](https://img.shields.io/npm/v/@omneo/omneo-sdk.svg)](https://npmjs.org/package/@omneo/omneo-sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@omneo/omneo-sdk.svg)](https://npmjs.org/package/@omneo/omneo-sdk)
[![License](https://img.shields.io/npm/l/@omneo/omneo-sdk.svg)](https://github.com/omneo/omneo-sdk/blob/master/package.json)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Release](https://github.com/omneo/omneo-sdk/actions/workflows/semantic-release.yml/badge.svg)](https://github.com/omneo/omneo-sdk/actions/workflows/semantic-release.yml)

A JavaScript Library to interface with the [Omneo API](https://omneo.readme.io/reference).

# Getting started

To get started with the Omneo SDK, follow the instructions below:

- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)
- [Contributing](#contributing)

## Installation

Omneo SDK is available as an [npm package](https://www.npmjs.com/package/@omneo/omneo-sdk):

```shell
// npm
npm install @omneo/omneo-sdk

// yarn
yarn add @omneo/omneo-sdk
```

```html
    <script type="module">
        import { Omneo, ID } from 'https://unpkg.com/@omneo/omneo-sdk@1.28.1/dist/index.js'; // replace version as needed
        async function run () {
            const IDClient = new ID({ tenant: 'sandbox', IDToken: 'YOUR TOKEN', config: {}})
            console.log(await IDClient.profiles.get())
        }

        run()
    </script>
```
## Authentication

All requests to the Omneo API must be authenticated with an [OAuth2](https://oauth.net/2/) bearer token.
Please review the [Authentication Docs](https://omneo.readme.io/docs/authentication) to learn more.

## Import

import with ES6 like this:

```typescript
import { Omneo } from '@omneo/omneo-sdk'

const client = new Omneo({
  token: 'Your token',
  tenant: 'Your omneo tenant'
})
```

# Documentation and Examples

Using [Profiles](./src/omneo/resources/profiles/README.md)

# Using Call
You can make calls manually to omneo using the `call` method. 
All API functions in this SDK use this method to call the API. 
This will cover any new API functionality not yet supported by the SDK. 

Make your own custom authenticated request like the below:

```
 client.call({
    method: 'post',
    endpoint: '/profiles',
    body: { first_name: 'test', last_name: 'test', email: 'test@test.com' }
  })
```

# Contributing

## Commit Validation
This repo requires specific commit formatting (Angular) to automate the deployment and versioning. 
Refer to the Angular commit message formatting guidelines [here](https://gist.github.com/brianclements/841ea7bffdb01346392c)

The easest way to get started is to use the [sample.ts]('/sample/sample.ts') file
You can modify this file and add any additional calls to the SDK, including any changes you've made. 
This is the quickest way to start with development

Modify sample.ts and run:
`npm run sample.ts`

Alternitively, you can link the SDK repo to your own external projects with NPM below. 
This is useful if you'd like to test the SDK in a specific scenareo.

npm link:

run npm link in your local copy of this repo's directory

run npm link <"path to this repo"> first in your consuming app's directory

### Hot Reloading an external project

To include your local version of the omneo SDK in your project,
and have it hot reload when changes are made to any SDK files 
you can include the below in your package.json

```json
  "dependencies": {
    "@omneo/omneo-sdk": "file:../omneo-sdk", // Reference to your local version of the omneo-sdk
  },
```

Following this run `npm run watch` in your omneo-sdk directory, to automatically rebuild on changes. 