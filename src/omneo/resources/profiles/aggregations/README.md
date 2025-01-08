### List Profile Aggregations

```javascript
const profileId = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.aggregations.list(profileId, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Calculate Profile Aggregations

```javascript
const profileId = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.aggregations.calculate(profileId, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
