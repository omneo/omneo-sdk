# Audits

This document provides examples of how to use the `Audits` class to manage audit records in your application.

## Get Audit

To retrieve a specific audit record, use the `get` method:

```javascript
omneoClient.audits.get(1234)
    .then((audit) => {
        console.log(audit)
    })
    .catch((error) => {
        console.error(error)
    })
```

## List Audits

To retrieve a list of audit records, use the `list` method:

```javascript
omneoClient.audits.list()
    .then((auditResponse) => {
        console.log(auditResponse)
    })
    .catch((error) => {
        console.error(error)
    })
```
