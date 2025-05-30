## Profile Appearance Attributes

Customer profile appearance attributes management functionality.
This allows customers to retrieve and update their profile appearance settings.

### Get Appearance Settings

Retrieves the current appearance settings for the profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.attributes.appearance.get()
    .then((data) => {
        // handle response data
        // data contains appearance settings
    })
    .catch((error) => {
        // handle error
    });
```

### Update Appearance Settings

Updates the appearance settings for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.attributes.appearance.update()
    .then((data) => {
        // handle response data
        // data contains the updated appearance settings
    })
    .catch((error) => {
        // handle error
    });
```