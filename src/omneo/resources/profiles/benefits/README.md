### Get Benefit

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.get(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Benefits

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.benefits.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Benefit

```javascript
const profileID = 'profile123';
const benefitID = 'benefit123';
const body = {
    // benefit update data
};

omneoClient.profiles.benefits.update(profileID, benefitID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Benefit

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.delete(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Redeem Benefit

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.redeem(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```