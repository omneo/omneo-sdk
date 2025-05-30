## Ledgers

Customer ledgers management functionality.
This allows customers to retrieve information about transaction and order ledgers for their profile.

### Get Ledger
Retrieves a specific ledger by ID.

```javascript
const ledgerID = 'ledger-123';

const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.ledgers.get(ledgerID)
    .then((data) => {
        // handle response data
        // data could be either a TransactionLedger or an OrderLedger
    })
    .catch((error) => {
        // handle error
    });
```

### List Ledgers

Retrieves a list of ledgers for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.ledgers.list()
    .then((data) => {
        // handle response data
        // data is an array of TransactionLedger or OrderLedger objects
    })
    .catch((error) => {
        // handle error
    });
```