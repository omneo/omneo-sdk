# Credit Definitions

This document provides examples of how to use the `CreditDefinitions` class to manage credit definitions in your application.

## Get Credit Definition

To retrieve a specific credit definition, use the `get` method:

```javascript
const creditDefinitionId = 11
omneoClient.creditDefinitions.get(creditDefinitionId)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## List Credit Definitions

To retrieve a list of credit definitions, use the `list` method:

```javascript
const params = {
  'filter[handle]': 'gift-voucher'
}
omneoClient.creditDefinitions.list(params)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Create Credit Definition

To create a new credit definition, use the `create` method:

```javascript
const payload = {
    "name": "test credits",
    "handle": "test-credits",
    "is_published": 1,
    "type": "gift_card"
}
omneoClient.creditDefinitions.create(payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Update Credit Definition

To update a specific credit definition, use the `update` method:

```javascript
const creditDefinitionId = 11
const payload = {
    "name": "test credits2",
    "require_assigned": true,
    "is_extendable": true,
    "is_assignable": true,
    "is_releasable": true,
    "is_reassignable": true
}

omneoClient.creditDefinitions.update(creditDefinitionId, payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Delete Benefit Definition

To delete a credit definition, use the `delete` method:

```javascript
const creditDefinitionId = 11
omneoClient.creditDefinitions.delete(creditDefinitionId)
    .then((data) => {
      // handle response
      console.log('Response:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```
