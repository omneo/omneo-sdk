## Aggregations

Customer profile aggregations functionality.
This allows customers to retrieve and calculate aggregated data related to their profile.

### List Aggregations

Retrieves a list of aggregations for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.aggregations.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Calculate Aggregations

Calculates aggregations for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.aggregations.calculate(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```