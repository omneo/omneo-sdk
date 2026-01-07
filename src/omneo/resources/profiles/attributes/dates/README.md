## Dates

### List Profile Dates

```javascript
const profileID = 'profile-id';
const params = {}; // optional request parameters

omneoClient.profiles.attributes.dates.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Date Attribute

Update a specific date attribute by `handle` and `relationship`.
```javascript
const profileId = 'profile-id';
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
const omneoClient = new Omneo({ token: 'your-api-token', tenant: 'tenant-name' })
omneoClient.profiles.attributes.dates.update(profileId, payload)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Profile Date

```javascript
const profileID = 'profile-id';
const dateID = 123; // ID of the date to delete

omneoClient.profiles.attributes.dates.delete(profileID, dateID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```