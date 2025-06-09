## Identities

Customer identities management functionality.
This allows customers to retrieve, create, update, and delete identities in their profile.

### Get Identity
Retrieves a specific identity by handle.

```javascript
const handle = 'email';

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.get(handle)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Get Identity By ID
Retrieves a specific identity by ID.

```javascript
const identityID = 123;

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.getByID(identityID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### List Identities

Retrieves a list of identities for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Create Identity

Creates a new identity for the current profile.
```javascript
const identityData = {
    // identity creation data fields
    handle: 'email',
    identifier: 'user@example.com',
    // other required fields
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.create(identityData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Identity

Updates an existing identity for the current profile by handle.
```javascript
const handle = 'email';
const updateData = {
    // identity update data fields
    identifier: 'newemail@example.com',
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.update(handle, updateData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Identity By ID

Updates an existing identity for the current profile by ID.
```javascript
const identityID = 123;
const updateData = {
    // identity update data fields
    identifier: 'newemail@example.com',
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.updateByID(identityID, updateData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Identity

Deletes a specific identity by handle.
```javascript
const handle = 'email';
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.delete(handle)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Identity By ID

Deletes a specific identity by ID.
```javascript
const identityID = 123;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.identities.deleteByID(identityID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Find Identity In Profile

Finds an identity in a profile object by handle, identifier, or most recent.
```javascript
const profile = {/* profile object */};
const options = {
    handle: 'email',
    identifier: 'user@example.com',
    findLatest: true // optional - to find the most recently created identity
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
const identity = IDClient.profile.identities.findInProfile(profile, options);

if (identity) {
    // handle found identity
    console.log('identity:', identity)
} else {
    // handle not found case
}
```