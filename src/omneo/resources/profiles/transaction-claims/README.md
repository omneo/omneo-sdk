### Get Transaction Claim

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

