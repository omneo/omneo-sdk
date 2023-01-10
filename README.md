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

# Usage

Here are some examples using the sdk

### Profiles

```typescript
  // Retrieve a single profile
  const profile = await client.getProfileByID('97e9c263-0f79-4e73-b734-bb19fb453d5d')
  
  // Search for an identity in a profile object
  const shopifyIdentity = client.findIdentityInProfile(profile, { namespace: 'shopify' })

  // Retrieve a profile by email
  const profileByEmail = await client.getProfileByEmail('john@example.com')

  // Retrieve a profile by identity
  const profileByIdentity = await client.getProfileByIdentity('399142', 'shopify')

  // Check if mobile is available
  const mobileAvailability = await client.checkAvailability({mobile_phone: '0404113331'})

  // Check if email is available
  const mobileAvailability = await client.checkAvailability({email: 'john@example.com'})

  // Check if a profile is subscribed from a platform
  const isSubscribed = client.isSubscribed(profile.attributes.comms, 'email')

  // A quick way to subscribe a profile
  const subscribe = client.subscribe(profile.id, 'email')

  // Check if a profile is unsubscribed from a platform
  const isUnsubscribed = client.isUnsubscribed(profile.attributes.comms, 'phone')

  // A quick way to unsubscribe a profile
  const unsubscribe = client.unsubscribe(profile.id, 'email', { toggleOptOut: false })
```

## Profile Address

```typescript
  const profile = await client.getProfileByID('97e9c263-0f79-4e73-b734-bb19fb453d5d')
  const address = {
    address_line_1: '123 George St',
    city: 'Melbourne',
    state: 'VIC',
    iso: 'AU',
    country: 'Australia',
    iso_state: 'VIC',
    postcode: '3000'
  }

  const newAddress = await client.createProfileAddress(profile.id, address)

  // Delete the address
  await client.deleteProfileAddress(profile.id, newAddress.id)
```

## Interactions

```typescript
  const interaction = {
    action: 'broadcast',
    channel: 'email',
    signal: 1,
    name: 'Subscribed to campaign',
    namespace: 'mailchimp',
    profile_id: '97e9c263-0f79-4e73-b734-bb19fb453d5d'
  }

  // Create an Interaction
  const interactionResponse = await client.createProfileInteraction(interaction)
  
  // Get a profiles interactions
  const interactions = await client.getProfileInteractions(profile.id)

  const searchParams = {
    'filter[namespace]': 'mailchimp',
    'filter[signal]': 0,
    'filter[channel]': 'service'
  }
  
  const filteredInteractions = await client.getProfileInteractions(profile.id, searchParams)

```