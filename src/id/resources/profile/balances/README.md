## Balances

Customer balances information functionality.
This allows customers to retrieve the current balances associated with their profile.

### Get Balances

Retrieves all balances for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.balances.get()
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```