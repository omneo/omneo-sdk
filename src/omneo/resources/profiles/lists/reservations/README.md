## Profile List Reservations

Read profile reservation records.

### List Profile Reservations

```javascript
const profileId = 'profile-id'

omneoClient.profiles.lists.reservations.list(profileId)
  .then((data) => {
    // handle response data
    console.log('Reservations:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```