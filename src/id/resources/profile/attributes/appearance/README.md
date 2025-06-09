## Profile Appearance Attributes

Customer profile appearance attributes management functionality.
This allows customers to retrieve and update their profile appearance settings.

### Get Appearance Settings

Retrieves the current appearance settings for the profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.appearance.get()
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Appearance Settings

Updates the appearance settings for the current profile.
```javascript
const params = {
    "hair_colour": "Brown"
}
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.attributes.appearance.update(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```