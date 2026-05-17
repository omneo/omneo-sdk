# Action Histories

This document provides examples of how to use the `ActionHistories` class to retrieve action history records in your application.

## List Action Histories

To retrieve a list of action histories, use the `list` method:

```javascript
omneoClient.actionHistories
  .list()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

## Get Action History

To retrieve a specific action history record, use the `get` method:

```javascript
const actionHistoryId = 123

omneoClient.actionHistories
  .get(actionHistoryId)
  .then((actionHistory) => {
    console.log(actionHistory)
  })
  .catch((error) => {
    console.error(error)
  })
```
