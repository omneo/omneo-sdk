## Regions

Profile regions management functionality.
This allows customers to retrieve information about regions associated with their profile.

### List Regions

Retrieves a list of regions for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.regions.list()
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```