### Get Interaction

```javascript
const profileID = 'profile123';
const interactionID = 'interaction456';

omneoClient.profiles.interactions.get(profileID, interactionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Interactions

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.interactions.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Interaction

```javascript
const interactionInput = {
    // interaction input data
};

omneoClient.profiles.interactions.create(interactionInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Interaction

```javascript
const profileID = 'profile123';
const interactionID = 'interaction456';
const interactionInput = {
    // updated interaction input data
};

omneoClient.profiles.interactions.update(profileID, interactionID, interactionInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Interaction

```javascript
const profileID = 'profile123';
const interactionID = 'interaction456';

omneoClient.profiles.interactions.delete(profileID, interactionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
