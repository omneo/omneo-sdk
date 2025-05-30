## Profile Communication Attributes

Customer profile communication preferences management functionality.
This allows customers to retrieve and update their communication preferences.

### Get Communication Preferences

Retrieves the current communication preferences for the profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.attributes.comms.get()
    .then((data) => {
        // handle response data
        // data contains communication preferences
    })
    .catch((error) => {
        // handle error
    });
```

### Update Communication Preferences

Updates the communication preferences for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.attributes.comms.update()
    .then((data) => {
        // handle response data
        // data contains the updated communication preferences
    })
    .catch((error) => {
        // handle error
    });
```