## Balances

Customer balances information functionality.
This allows customers to retrieve the current balances associated with their profile.

### Get Balances

Retrieves all balances for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.balances.get()
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```