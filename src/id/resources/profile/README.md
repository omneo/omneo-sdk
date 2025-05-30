## Profile

Customer profile management functionality.
This allows customers to retrieve and manage their profile information.

### Get Profile

Retrieves the current profile information.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.get()
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile

Updates information for the current profile.
```javascript
const profileData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    // other profile fields
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.update(profileData)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Profile

Deletes the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.delete()
    .then(() => {
        // handle successful deletion
    })
    .catch((error) => {
        // handle error
    });
```

### Purge Profile

Completely purges the current profile data.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.purge()
    .then(() => {
        // handle successful purge
    })
    .catch((error) => {
        // handle error
    });
```

### Resync Profile

Forces a resync of the profile data.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.resync()
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Check Subscription Status

Checks if the profile is subscribed to a specific communication channel.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
const commsData = { /* communications preferences data */ };
const isSubscribed = IDClient.profile.isSubscribed(commsData, 'email');

if (isSubscribed) {
    // handle subscribed state
} else {
    // handle unsubscribed state
}
```

### Check Unsubscription Status

Checks if the profile is unsubscribed from a specific communication channel.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
const commsData = { /* communications preferences data */ };
const isUnsubscribed = IDClient.profile.isUnsubscribed(commsData, 'email');

if (isUnsubscribed) {
    // handle unsubscribed state
} else {
    // handle subscribed state
}
```

### Subscribe to Communications

Subscribes the profile to a specific communication channel.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.subscribe('email')
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Unsubscribe from Communications

Unsubscribes the profile from a specific communication channel.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.unsubscribe('email', { toggleOptOut: true })
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Redeem Points

Redeems a specific amount of points.
```javascript
const amount = 100;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.redeem(amount)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Profile Type

Updates the type of the profile.
```javascript
const profileType = 'customer';
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.updateType(profileType)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Get Transaction Products

Retrieves products from transactions associated with the profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.transactionProducts(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Access Connected Profile

Accesses information for a connected profile.
```javascript
const connectionID = 12345;
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
const connectedProfile = IDClient.profile.Connection(connectionID);

// Now you can use all profile methods on the connected profile
connectedProfile.get()
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```