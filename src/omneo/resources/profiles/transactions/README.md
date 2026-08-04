### Get Transaction

Retrieves a specific transaction by ID for a given profile.

```javascript
const profileID = 'profile123';
const transactionID = 'transaction456';

omneoClient.profiles.transactions.get(profileID, transactionID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Transactions

Retrieves a list of all transactions for the specified profile.

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.transactions.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Find Transaction

Finds a transaction based on a specific filter criteria.

```javascript
const profileID = 'profile123';
const filter = {
    field: 'transactionField',
    value: 'filterValue'
};

omneoClient.profiles.transactions.find(profileID, filter)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Get Grouped Transactions

Retrieves transactions grouped by specific criteria with pagination support.

```javascript
const profileID = 'profile123';
const params = {
    pageSize: 10,
    pageNumber: 1
};

omneoClient.profiles.transactions.getGrouped(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Get Unassigned Items

Retrieves transaction items that are not assigned to any list.

```javascript
const profileID = 'profile123';
const params = {
    include_list_item: 1
};

omneoClient.profiles.transactions.getUnassignedItems(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Get Assigned Items

Retrieves transaction items that are assigned to lists.

```javascript
const profileID = 'profile123';
const params = {
    include_list_item: 1
};

omneoClient.profiles.transactions.getAssignedItems(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Link Transaction Item to List

Links a specific transaction item to a profile list.

```javascript
const profileID = 'profile123';
const transactionItemId = 123;
const profileListId = 456;

omneoClient.profiles.transactions.linkListItem(profileID, transactionItemId, profileListId)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Unlink Transaction Item from List

Unlinks a specific transaction item from a profile list.

```javascript
const profileID = 'profile123';
const transactionItemId = 123;
const profileListId = 456;

omneoClient.profiles.transactions.unlinkListItem(profileID, transactionItemId, profileListId)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Unattach Transaction

Unattaches a transaction from the specified profile.

```javascript
const profileID = 'profile123';
const transactionId = 12345;

omneoClient.profiles.transactions.unattach(profileID, transactionId)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
