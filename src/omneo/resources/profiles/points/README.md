### Get Profile Point

```javascript
const profileID = 'profile123';
const pointID = 12345;

omneoClient.profiles.points.get(profileID, pointID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Profile Points

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.points.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Profile Point

```javascript
const profileID = 'profile123';
const body = {
    // point input data
};

omneoClient.profiles.points.create(profileID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile Point

```javascript
const profileID = 'profile123';
const pointID = 'point123';
const body = {
    // partial point input data
};

omneoClient.profiles.points.update(profileID, pointID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Profile Point

```javascript
const profileID = 'profile123';
const pointID = 12345;

omneoClient.profiles.points.delete(profileID, pointID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
