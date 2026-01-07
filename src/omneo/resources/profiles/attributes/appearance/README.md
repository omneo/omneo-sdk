## Apperance

### Get Profile Appearance

```javascript
const profileID = 'profile-id';

omneoClient.profiles.attributes.appearance.get(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile Appearance

```javascript
const profileID = 'profile-id';

omneoClient.profiles.attributes.appearance.update(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```