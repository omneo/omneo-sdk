## Custom Attributes

### Get Profile Custom Attributes

```javascript
const profileID = 'profile-id';

omneoClient.profiles.attributes.custom.get(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile Custom Attributes

```javascript
const profileID = 'profile-id';

omneoClient.profiles.attributes.custom.update(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```