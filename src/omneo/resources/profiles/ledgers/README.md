### Get Ledger

```javascript
const profileID = 'profile123';
const ledgerID = 'ledger123';

omneoClient.profiles.ledgers.get(profileID, ledgerID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Ledgers

```javascript
const profileID = 'profile123';

omneoClient.profiles.ledgers.list(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

