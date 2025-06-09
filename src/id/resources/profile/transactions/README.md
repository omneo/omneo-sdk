## Transactions

Customer transactions management functionality.
This allows customers to retrieve information about their transactions.

### Get Transaction
Retrieves a specific transaction by ID.

```javascript
const transactionID = '12345';

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactions.get(transactionID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### List Transactions

Retrieves a list of transactions for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactions.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Find Transactions

Find a transaction based on a specific filter.
```javascript
const filter = {
    field: 'transaction_id', // TransactionFilters type
    value: '12345'
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactions.find(filter)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Get Grouped Transactions

Retrieves transactions grouped by some criteria.
```javascript
const params = {
    pageSize: 10,
    pageNumber: 1
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactions.getGrouped(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Get Unassigned Transaction Items

Retrieves transaction items that are not assigned.
```javascript
const params = {
    include_list_item: 1 // 1 to include or 0 to exclude
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactions.getUnassignedItems(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```