## Connections

Customer connections management functionality.
This allows customers to retrieve, update connections between profiles.

### List Connections

Retrieves a list of connections for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.connections.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Connection

Updates an existing connection for the current profile.
```javascript
const connectionID = '12345';
const updateData = {
    // connection update data fields
    type: 'family',
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.connections.update(connectionID, updateData)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Get Profile Info

Retrieves profile information for a connected profile.
```javascript
const connectionID = 12345;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.connections.getProfileInfo(connectionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```