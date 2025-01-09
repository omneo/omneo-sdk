### Get Permission

```javascript
const permissionId = 12345;

omneoClient.permissions.get(permissionId)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Permissions

```javascript
const params = {
    // request parameters
};

omneoClient.permissions.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
