## Benefits

Customer benefits management functionality.
This allows customers to retrieve, update, delete, redeem, and claim benefits associated with their profile.

### Get Benefit
Retrieves a specific benefit by ID.

```javascript
const benefitID = 1234;

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.get(benefitID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### List Benefits

Retrieves a list of benefits for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Benefit

Updates an existing benefit for the current profile.
```javascript
const benefitID = 1234;
const updateData = {
    // benefit update data fields
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.update(benefitID, updateData)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Delete Benefit

Deletes a specific benefit by ID.
```javascript
const benefitID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.delete(benefitID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Redeem Benefit

Redeems a specific benefit by ID.
```javascript
const benefitID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.redeem(benefitID)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Viewable Benefits

Retrieves a list of benefit definitions that are viewable by the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.viewable()
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Claimable Benefits

Retrieves a list of benefit definitions that are claimable by the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.claimable()
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Claim Benefit

Claims a benefit for the current profile.
```javascript
const claimInput = {
    definition: 'benefit-handle',
    timezone: 'Australia/Melbourne',
    external_id: null,  // optional
    meta: null          // optional
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.claim(claimInput)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Claim and Redeem Benefit

Claims and immediately redeems a benefit for the current profile. Returns a redemption record.
```javascript
const claimInput = {
    definition: 'benefit-handle',
    timezone: 'Australia/Melbourne',
    external_id: null,  // optional
    meta: null          // optional
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.claimRedeem(claimInput)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Redeemable Benefits

Retrieves a list of benefits that are currently redeemable by the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.benefits.redeemable()
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```