### Get Connection

```javascript
const profileID = 'profile123';
const connectionID = 12345;

omneoClient.profiles.connections.get(profileID, connectionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Connections

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.connections.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Connection

```javascript
const profileID = 'profile123';
const body = {
    // connection input data
};

omneoClient.profiles.connections.create(profileID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Connection

```javascript
const profileID = 'profile123';
const connectionID = 'connection123';
const body = {
    // partial connection input data
};

omneoClient.profiles.connections.update(profileID, connectionID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Connection

```javascript
const profileID = 'profile123';
const connectionID = 12345;

omneoClient.profiles.connections.delete(profileID, connectionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Get Profile Info

```javascript
const profileID = 'profile123';
const connectionID = 12345;

omneoClient.profiles.connections.getProfileInfo(profileID, connectionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
