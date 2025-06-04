## Rewards

Customer reward management functionality.
This allows customers to retrieve, create, update, and delete rewards in their profile.

### Get Reward
Retrieves a specific reward by ID.

```javascript
const rewardID = 1234;

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.rewards.get(rewardID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### List Rewards

Retrieves a list of rewards for the current profile.
```javascript
const params = {
    // optional request parameters
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.rewards.list(params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Create Reward

Creates a new reward for the current profile.
```javascript
const rewardData = {
    // reward creation data fields
    reward_definition_id: 123,
    // other required fields
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.rewards.create(rewardData)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Update Reward

Updates an existing reward for the current profile.
```javascript
const rewardID = '1234';
const updateData = {
    // reward update data fields
    status: 'redeemed',
    // other fields to update
};
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.rewards.update(rewardID, updateData)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### Delete Reward

Deletes a specific reward by ID.
```javascript
const rewardID = 1234;
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.rewards.delete(rewardID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```