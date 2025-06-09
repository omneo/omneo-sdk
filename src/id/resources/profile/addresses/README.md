## Addresses

Customer addresses management functionality.
This allows customers to retrieve, create, update, and delete addresses in their profile.

### Get Address
Retrieves a specific address by ID.

```javascript
const addressID = '518';

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.addresses.get(addressID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### List Addresses

Retrieves a list of addresses for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.addresses.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Create Address

Creates a new address for the current profile.
```javascript
const addressData = {
    address_line_1: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postcode: '1234',
    country: 'AU',
    is_default: false
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.addresses.create(addressData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Address

Updates an existing address for the current profile.
```javascript
const addressID = '518';
const updateData = {
    address_line_1: '456 Oak Ave',
    city: 'Anytown',
    state: 'CA',
    postcode: '1235',
    country: 'AU',
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.addresses.update(addressID, updateData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Address

Deletes a specific address by ID.
```javascript
const addressID = '518';
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.addresses.delete(addressID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```