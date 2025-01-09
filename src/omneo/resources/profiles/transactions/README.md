### Get Transaction

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
