## Profile Date Attributes

Customer profile date attributes management functionality.
This allows customers to retrieve and delete date attributes in their profile.

### List Date Attributes

Retrieves a list of date attributes for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.dates.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Date Attribute

Deletes a specific date attribute by ID.
```javascript
const dateID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.dates.delete(dateID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```