## Profile List Items

### Get Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;

omneoClient.profiles.lists.items.get(profileID, listID, listItemID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### List Profile List Items

```javascript
const profileID = 'profile-id';
const listID = 123;
const params = { /* request parameters */ };

omneoClient.profiles.lists.items.list(profileID, listID, params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Create Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;
const body = {
    "product_variant_id": 3,
    "product_id": 5,
    "quantity": 1,
    "status": "remaining"
};

omneoClient.profiles.lists.items.create(profileID, listID, listItemID, body)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```
### Create Profile List Custom Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;
const body = {
    "name": "test item",
    "product_id": 170135,
    "quantity": 1,
    "position": 1
};

omneoClient.profiles.lists.items.custom(profileID, listID, listItemID, body)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Update Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;
const body = {
    "status": "Gifted",
    "quantity": 5,
    "meta": {
        "test-key": "value"
    }
}
omneoClient.profiles.lists.items.update(profileID, listID, listItemID, body)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Delete Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;

omneoClient.profiles.lists.items.delete(profileID, listID, listItemID)
    .then((data) => {
        // handle response
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```