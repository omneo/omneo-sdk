## Benefits

Customer benefits management functionality.
This allows customers to retrieve, update, delete, and redeem benefits associated with their profile.

### Get Benefit
Retrieves a specific benefit by ID.

```javascript
const benefitID = 1234;

const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.benefits.get(benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Benefits

Retrieves a list of benefits for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.benefits.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Benefit

Updates an existing benefit for the current profile.
```javascript
const benefitID = '1234';
const updateData = {
    // benefit update data fields
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.benefits.update(benefitID, updateData)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Benefit

Deletes a specific benefit by ID.
```javascript
const benefitID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.benefits.delete(benefitID)
    .then(() => {
        // handle successful deletion
    })
    .catch((error) => {
        // handle error
    });
```

### Redeem Benefit

Redeems a specific benefit by ID.
```javascript
const benefitID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.benefits.redeem(benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```