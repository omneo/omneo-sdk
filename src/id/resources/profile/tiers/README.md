## Tiers

Customer tier management functionality.
This allows customers to list, calculate and assign tiers to their profile.

### List Tiers

Retrieves a list of tiers for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.tiers.list(params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Calculate Tiers

Calculates tier progress for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.tiers.calculate()
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Assign Tier

Assigns a specific tier to the current profile.
```javascript
const tierDefinitionHandle = 'gold-tier';
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.tiers.assign(tierDefinitionHandle)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```