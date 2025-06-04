## Interactions

Customer interactions management functionality.
This allows customers to retrieve, create, update, and delete interactions associated with their profile.

### Get Interaction
Retrieves a specific interaction by ID.

```javascript
const interactionID = '12345';

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.interactions.get(interactionID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### List Interactions

Retrieves a list of interactions for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.interactions.list(params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Delete Interaction

Deletes a specific interaction by ID.
```javascript
const interactionID = '12345';
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.interactions.delete(interactionID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```