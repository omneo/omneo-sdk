# List Definitions

This document provides examples of how to use the `ListDefinitions` class to manage list definitions in your application.

## Get List Definition

To retrieve a specific list definition, use the `get` method:

```javascript
const listDefinitionId = 2
omneoClient.listDefinitions.get(listDefinitionId)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## List List Definitions

To retrieve a list of list definitions, use the `list` method:

```javascript
const params = {}
omneoClient.listDefinitions.list(params)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Create List Definition

To create a new list definition, use the `create` method:

```javascript
const payload = {
  "name": "Test-list-definition1",
  "handle": "test-list-definition1",
  "type": "gift_registry",
  "is_published": 1
}

omneoClient.listDefinitions.create(payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Update List Definition

To update a specific list definition, use the `update` method:

```javascript
const listDefinitionId = 2
const payload = {
  "name": "Test-list-definition2",
}
omneoClient.listDefinitions.update(listDefinitionId, payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Delete List Definition

To delete a list definition, use the `delete` method:

```javascript
const listDefinitionId = 2
omneoClient.listDefinitions.delete(listDefinitionId)
    .then((data) => {
      // handle response
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```
