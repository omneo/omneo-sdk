## Points

Customer points management functionality.
This allows customers to retrieve, create, update, and delete points in their profile.

### Get Point
Retrieves a specific point by ID.

```javascript
const pointID = 1234;

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.points.get(pointID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### List Points

Retrieves a list of points for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.points.list(params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Create Point

Creates a new point entry for the current profile.
```javascript
const pointData = {
    // point creation data fields
    amount: 100,
    // other required fields
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.points.create(pointData)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Update Point

Updates an existing point entry for the current profile.
```javascript
const pointID = '1234';
const updateData = {
    // point update data fields
    amount: 150,
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.points.update(pointID, updateData)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Delete Point

Deletes a specific point entry by ID.
```javascript
const pointID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.points.delete(pointID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```