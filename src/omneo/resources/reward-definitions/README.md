
### Get Reward Definition

To retrieve a specific reward definition, use the `get` method:

```javascript
omneoClient.rewardDefinitions.get(1423)
    .then((rewardDefinition) => {
        console.log(rewardDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Rewards Definitions

To retrieve a list of rewards definitions, use the `list` method:

```javascript
omneoClient.rewardDefinitions.list()
    .then((rewardDefinitions) => {
        console.log(rewardDefinitions)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Reward Definition

To create a new reward definition, use the `create` method:

```javascript

const payload = {
    name: 'Test Reward',
    handle: 'test-reward',
    value: 10,
    period: 30,
    period_type: 'days',
    type: 'spend',
    is_assignable: true,
    is_published: true
}

omneoClient.rewardDefinitions.create(payload)
    .then((rewardDefinition) => {
        console.log(rewardDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```
### Update Reward Definition

To update a specific reward definition, use the `update` method:

```javascript

const payload = {
    name: 'Test reward2'
}

omneoClient.rewardDefinitions.update(1342, payload)
    .then((rewardDefinition) => {
        console.log(rewardDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Reward Definition

To delete a reward definition, use the `delete` method:

```javascript
omneoClient.rewardDefinitions.delete(1342)
    .then(() => {
        console.log('reward definition deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```