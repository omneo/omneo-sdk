## Profile Lists

### Get Profile List

```javascript
const profileID = 'profile-id';
const listID = 'list-id';

omneoClient.profiles.lists.get(profileID, listID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Profile Lists

```javascript
const profileID = 'profile-id';
const params = { /* request parameters */ };

omneoClient.profiles.lists.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Profile List

```javascript
const profileID = 'profile-id';
const listInput = { /* list input data */ };

omneoClient.profiles.lists.create(profileID, listInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile List

```javascript
const profileID = 'profile-id';
const listID = 'list-id';
const body = { /* partial list input data */ };

omneoClient.profiles.lists.update(profileID, listID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Profile List

```javascript
const profileID = 'profile-id';
const listID = 'list-id';

omneoClient.profiles.lists.delete(profileID, listID)
    .then(() => {
        // handle successful deletion
    })
    .catch((error) => {
        // handle error
    });
```