## Profile Custom Attributes

Customer profile custom attributes management functionality.
This allows customers to retrieve, update, and delete custom attributes in their profile.

### Get Custom Attribute
Retrieves a specific custom attribute by namespace and handle.

```javascript
const namespace = 'loyalty';
const handle = 'preferences';

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.custom.get(namespace, handle)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### List Custom Attributes

Retrieves a list of custom attributes for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.custom.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Custom Attribute

Updates an existing custom attribute for the current profile.
```javascript
const namespace = 'loyalty';
const handle = 'preferences';
const updateData = {
    // custom attribute update data fields
    value: '{"preferences": {"email": true, "sms": false}}'
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.custom.update(namespace, handle, updateData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Custom Attribute

Deletes a specific custom attribute by namespace and handle.
```javascript
const namespace = 'loyalty';
const handle = 'preferences';
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.custom.delete(namespace, handle)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```