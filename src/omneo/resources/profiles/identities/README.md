### Get Identity

```javascript
const profileID = 'profile123';
const handle = 'identityHandle';

omneoClient.profiles.identities.get(profileID, handle)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Identities

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.identities.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Identity

```javascript
const profileID = 'profile123';
const body = {
    // identity input data
};

omneoClient.profiles.identities.create(profileID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Identity

```javascript
const profileID = 'profile123';
const handle = 'identityHandle';
const body = {
    // partial identity input data
};

omneoClient.profiles.identities.update(profileID, handle, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Identity

```javascript
const profileID = 'profile123';
const handle = 'identityHandle';

omneoClient.profiles.identities.delete(profileID, handle)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
