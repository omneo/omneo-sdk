## Profile List Items

### Get Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;

omneoClient.profiles.lists.items.get(profileID, listID, listItemID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
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
    })
    .catch((error) => {
        // handle error
    });
```

### Create Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;
const body = { /* list item input */ };

omneoClient.profiles.lists.items.create(profileID, listID, listItemID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;
const body = { /* list item input */ };

omneoClient.profiles.lists.items.update(profileID, listID, listItemID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Profile List Item

```javascript
const profileID = 'profile-id';
const listID = 123;
const listItemID = 456;

omneoClient.profiles.lists.items.delete(profileID, listID, listItemID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```