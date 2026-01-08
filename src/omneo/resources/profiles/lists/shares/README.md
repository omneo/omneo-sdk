## Profile List Shares

### Create Profile List Share

```javascript
const profileID = 'profile-id';
const listID = 123;

omneoClient.profiles.lists.shares.create(profileID, listID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Profile List Share

```javascript
const profileID = 'profile-id';
const listID = 123;
const shareId = 2

omneoClient.profiles.lists.shares.delete(profileID, listID, shareId)
  .then((data) => {
    // handle response
    console.log('Response :', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```