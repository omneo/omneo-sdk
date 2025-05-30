## Connections

Customer connections management functionality.
This allows customers to retrieve, create, update, and delete connections between profiles.

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

### Create Connection

Creates a new connection between profiles.
```javascript
const connectionData = {
    // connection creation data fields
    profile_id: 12345,
    type: 'friend',
    // other required fields
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.connections.create(connectionData)
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

### Delete Connection

Deletes a specific connection by ID.
```javascript
const connectionID = 12345;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.connections.delete(connectionID)
    .then(() => {
        // handle successful deletion
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