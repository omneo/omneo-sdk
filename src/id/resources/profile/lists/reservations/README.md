## Profile List Reservations

Read the authenticated profile reservation records.

### List Profile Reservations

```javascript
const IDClient = new ID({
  tenant: 'your-tenant',
  IDToken: 'your-id-token',
  config: {}
})

IDClient.profile.lists.reservations.list()
  .then((data) => {
    // handle response data
    console.log('Reservations:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
