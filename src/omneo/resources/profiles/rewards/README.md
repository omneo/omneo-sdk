### Get Reward

```javascript
const profileID = 'profile123';
const rewardID = 12345;

omneoClient.profiles.rewards.get(profileID, rewardID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Rewards

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.rewards.list(profileID, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Reward

```javascript
const profileID = 'profile123';
const body = {
    // reward creation data
};

omneoClient.profiles.rewards.create(profileID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Reward

```javascript
const profileID = 'profile123';
const rewardID = 'reward123';
const body = {
    // reward update data
};

omneoClient.profiles.rewards.update(profileID, rewardID, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Reward

```javascript
const profileID = 'profile123';
const rewardID = 12345;

omneoClient.profiles.rewards.delete(profileID, rewardID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```
