## Transaction claim

Customer claims on transactions. 
This allows customers to get claim info and list to their profile


### Get Transaction Claim
Retrieves a specific transaction claim by ID.

```javascript
const claimID = 1347;

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactionClaims.get(claimID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
### List Transaction Claims

Retrieves a list of transaction claims for the current profile.
```javascript
const params = {
    // request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactionClaims.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
### Delete Transaction Claim

Deletes a specific transaction claim by ID.
```javascript
const claimId = 24546;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.transactionClaims.delete(claimId)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```