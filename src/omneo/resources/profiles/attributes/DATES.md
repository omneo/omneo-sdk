## Dates

### List Profile Dates

```javascript
const profileID = 'profile-id';
const params = {}; // optional request parameters

omneoClient.profiles.attributes.dates.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Profile Date

```javascript
const profileID = 'profile-id';
const dateID = 123; // ID of the date to delete

omneoClient.profiles.attributes.dates.delete(profileID, dateID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```