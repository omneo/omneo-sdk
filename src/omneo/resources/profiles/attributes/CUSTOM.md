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
### Find Profiles with Custom Attributes

Get profiles with the specific custom attribute value
```javascript
const params = {
  'attributes[0][namespace]': 'locale',
  'attributes[0][handle]': 'language',
  'attributes[0][value][in]': 'EN,IT,FR',
  'page[size]': 10,
  sort: '-created_at'
}
omneoClient.profiles.attributes.custom.find(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```