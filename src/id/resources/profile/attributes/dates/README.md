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
### Update Date Attribute

Update a specific date attribute by `handle` and `relationship`.
```javascript
const payload = {
  date: '2024-11-27',
  is_recurring: true,
  recurring_schedule: 'Yearly',
  name: 'sdk_unit_test',
  handle: 'sdk_unit_test',
  relationship: 'Me',
  description: 'test123',
  meta: null,
  note: 'test456'
}
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.dates.update(payload)
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