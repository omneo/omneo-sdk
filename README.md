# Omneo JS SDK

[![Version](https://img.shields.io/npm/v/@omneo/omneo-sdk.svg)](https://npmjs.org/package/@omneo/omneo-sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@omneo/omneo-sdk.svg)](https://npmjs.org/package/@omneo/omneo-sdk)
[![License](https://img.shields.io/npm/l/@omneo/omneo-sdk.svg)](https://github.com/omneo/omneo-sdk/blob/master/package.json)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Release](https://github.com/omneo/omneo-sdk/actions/workflows/semantic-release.yml/badge.svg)](https://github.com/omneo/omneo-sdk/actions/workflows/semantic-release.yml)

A JavaScript Library to interface with the [Omneo API](https://omneo.readme.io/reference).

# Getting started

To get started with the Omneo SDK, follow the instructions below

- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)

## Installation

Omneo SDK is available as an [npm package](https://www.npmjs.com/package/@omneo/omneo-sdk):

```shell
// npm
npm install @omneo/omneo-sdk

// yarn
yarn add @omneo/omneo-sdk
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

[Profiles](./src/omneo/resources/profiles/README.md)

