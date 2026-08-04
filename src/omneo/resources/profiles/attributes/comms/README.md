## Communications

### Get Profile Communications

```javascript
const profileID = 'profile-id';

omneoClient.profiles.attributes.comms.get(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile Communications

```javascript
const profileID = 'profile-id';

omneoClient.profiles.attributes.comms.update(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```