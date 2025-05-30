## List Items

Customer list items management functionality.
This allows customers to retrieve, create, update, and delete items within their lists.

### Get List Item
Retrieves a specific list item by list ID and item ID.

```javascript
const listID = 123;
const itemID = 456;

const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.items.get(listID, itemID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Items

Retrieves all items in a specific list.
```javascript
const listID = 123;
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.items.list(listID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create List Item

Adds a new item to a specific list.
```javascript
const listID = 123;
const itemID = 456;
const itemData = {
    // list item properties
    quantity: 1,
    // other required fields
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.items.create(listID, itemID, itemData)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update List Item

Updates an existing item in a specific list.
```javascript
const listID = 123;
const itemID = 456;
const updateData = {
    // item update properties
    quantity: 2,
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.items.update(listID, itemID, updateData)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete List Item

Removes a specific item from a list.
```javascript
const listID = 123;
const itemID = 456;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.lists.items.delete(listID, itemID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```