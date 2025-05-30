## Lists

Customer lists management functionality.
This allows customers to create, retrieve, update, and delete lists in their profile.

### Get List
Retrieves a specific list by ID.

```javascript
const listID = 'list-123';

const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.get(listID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Lists

Retrieves all lists for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create List

Creates a new list for the current profile.
```javascript
const listInput = {
    name: 'My Favorites',
    description: 'A list of my favorite items'
    // other list properties
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.create(listInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update List

Updates an existing list for the current profile.
```javascript
const listID = 'list-123';
const updateData = {
    name: 'Updated List Name',
    description: 'Updated list description'
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.update(listID, updateData)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete List

Deletes a specific list by ID.
```javascript
const listID = 'list-123';
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.delete(listID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
