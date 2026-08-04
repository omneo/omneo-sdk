### Get Transaction Claim

Retrieves a specific transaction claim by ID for a given profile.

```javascript
const profileID = 'profile123';
const claimID = 1347;

omneoClient.profiles.transactionClaims.get(profileID, claimID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Transaction Claims

Retrieves a list of all transaction claims for the specified profile.

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.transactionClaims.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
### Delete Transaction Claim

Deletes a specific transaction claim by ID.

```javascript
const profileID = 'profile123';
const claimId = 24546;

omneoClient.profiles.transactionClaims.delete(profileID, claimId)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Transaction Claim

Creates a new transaction claim for the related profile.

```javascript
const profileID = 'profile123';
const claimInput = {
    // claim transaction input
};

omneoClient.profiles.transactionClaims.create(profileID, claimInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

