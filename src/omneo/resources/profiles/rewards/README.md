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
