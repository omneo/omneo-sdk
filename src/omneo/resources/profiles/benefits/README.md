## Benefits

Profile benefits management functionality.
This allows administrators to retrieve, update, delete, redeem, and claim benefits for a specific profile.

### Get Benefit

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.get(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Benefits

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.benefits.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Benefit

```javascript
const profileID = 'profile123';
const benefitID = 'benefit123';
const body = {
    // benefit update data
};

omneoClient.profiles.benefits.update(profileID, benefitID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Benefit

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.delete(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Redeem Benefit

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.redeem(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Viewable Benefits

Retrieves a list of benefit definitions that are viewable for the specified profile.

```javascript
const profileID = 'profile123';
const benefitID = 12345;

omneoClient.profiles.benefits.viewable(profileID, benefitID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Claimable Benefits

Retrieves a list of benefit definitions that are claimable for the specified profile.

```javascript
const profileID = 'profile123';

omneoClient.profiles.benefits.claimable(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Claim Benefit

Claims a benefit for the specified profile.

```javascript
const profileID = 'profile123';
const claimInput = {
    definition: 'benefit-handle',
    timezone: 'Australia/Melbourne',
    external_id: null,  // optional
    meta: null          // optional
};

omneoClient.profiles.benefits.claim(profileID, claimInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Claim and Redeem Benefit

Claims and immediately redeems a benefit for the specified profile. Returns a redemption record.

```javascript
const profileID = 'profile123';
const claimInput = {
    definition: 'benefit-handle',
    timezone: 'Australia/Melbourne',
    external_id: null,  // optional
    meta: null          // optional
};

omneoClient.profiles.benefits.claimRedeem(profileID, claimInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Redeemable Benefits

Retrieves a list of benefits that are currently redeemable for the specified profile.

```javascript
const profileID = 'profile123';

omneoClient.profiles.benefits.redeemable(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
