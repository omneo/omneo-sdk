### Get Address

```javascript
const profileID = 'profile123';
const addressID = 'address123';

omneoClient.profiles.addresses.get(profileID, addressID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Addresses

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.addresses.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Address

```javascript
const profileID = 'profile123';
const body = {
    // address input data
};

omneoClient.profiles.addresses.create(profileID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Address

```javascript
const profileID = 'profile123';
const addressID = 'address123';
const body = {
    // address update input data
};

omneoClient.profiles.addresses.update(profileID, addressID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Address

```javascript
const profileID = 'profile123';
const addressID = 'address123';

omneoClient.profiles.addresses.delete(profileID, addressID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
