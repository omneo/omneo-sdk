
### Get Reward

To retrieve a specific reward, use the `get` method:

```javascript
omneoClient.rewards.get(1423)
    .then((reward) => {
        console.log(reward)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Rewards

To retrieve a list of rewards, use the `list` method:

```javascript
omneoClient.rewards.list()
  .then((rewards) => {
    console.log(rewards)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Create Reward

To create a new reward, use the `create` method:

```javascript

const payload = {
    reward_definition_id: 42,
    profile_id: '9d99d6e8-8181-4a74-a121-a85de2e8a516',
    value_initial: 5,
    value_remaining: 5,
    expires_at: '2024-12-19 08:30:00',
    issued_at: '2024-12-05 08:30:00',
    timezone: 'Australia/Melbourne',
    external_id: 'sdk_unit_test_135678'
}

omneoClient.rewards.create(payload)
    .then((reward) => {
        console.log(reward)
    })
    .catch((error) => {
        console.error(error)
    })
```
### Update Reward

To update a specific reward, use the `update` method:

```javascript

const payload = {
    value_initial: 101,
    value_remaining: 101,
    expires_at: '2024-12-21 08:30:00'
}

omneoClient.rewards.update(1342, payload)
    .then((reward) => {
        console.log(reward)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Reward

To delete a reward, use the `delete` method:

```javascript
omneoClient.rewards.delete(1342)
    .then(() => {
        console.log('reward deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```