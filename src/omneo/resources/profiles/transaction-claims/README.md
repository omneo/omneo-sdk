### Get Transaction Claim

```javascript
const profileID = 'profile123';
const claimID = 'transaction456';

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

