# Allocations

This document provides examples of how to use the `Allocations` class to manage allocations in your application.

## List Allocations

To retrieve a list of allocations, use the `list` method:

```javascript
omneoClient.allocations
  .list()
  .then((allocations) => {
    console.log(allocations)
  })
  .catch((error) => {
    console.error(error)
  })
```

You can also pass query parameters to filter and paginate results:

```javascript
const params = {
  ['page[size]']: 20
}

omneoClient.allocations
  .list(params)
  .then((allocations) => {
    console.log(allocations)
  })
  .catch((error) => {
    console.error(error)
  })
```

## Count Allocations

To retrieve allocation count statistics for a specific benefit definition, use the `count` method:

```javascript
const benefitDefinitionId = 10

omneoClient.allocations
  .count(benefitDefinitionId)
  .then((countData) => {
    console.log(countData)
  })
  .catch((error) => {
    console.error(error)
  })
```
