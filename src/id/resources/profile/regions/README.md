## Regions

Profile regions management functionality.
This allows customers to retrieve information about regions associated with their profile.

### List Regions

Retrieves a list of regions for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.regions.list()
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```