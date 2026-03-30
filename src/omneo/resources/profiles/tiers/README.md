## Profile Tiers

Profile tier management functionality for a specific profile.
This includes listing current tier state, calculating latest progress, assigning a tier, and listing tier points.

### List Profile Tiers

Retrieves the current tier information for the given profile.

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

Calculates and returns the latest tier progress for the given profile.

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

Assigns a tier definition to the given profile.

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

### List Profile Tier Points

Retrieves tier point records for the given profile.

```javascript
const profileID = 'profile123';
const params = {
    // optional request parameters
};

omneoClient.profiles.tiers.points(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
