### List Profile Tiers

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.tiers.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Calculate Profile Tier

```javascript
const profileID = 'profile123';

omneoClient.profiles.tiers.calculate(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Assign Profile Tier

```javascript
const profileID = 'profile123';
const tierDefinitionHandle = 'tierHandle';

omneoClient.profiles.tiers.assign(profileID, tierDefinitionHandle)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
