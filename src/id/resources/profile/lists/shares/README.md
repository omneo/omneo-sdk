## Profiel List Shares

Customer Profile list share management functionality.
This allows customers to create and delete share within their lists.

### Create List Share

Create a list share to a specific list.
```javascript
const listID = 123;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.lists.shares.create(listID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete List Share

```javascript
const listID = 123;
const shareId = 456;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.lists.shares.delete(listID, shareId)
  .then((data) => {
    // handle response
    console.log('Response:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
