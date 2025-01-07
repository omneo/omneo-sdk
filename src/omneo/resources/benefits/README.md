### Get Benefit

To retrieve a specific benefit, use the `get` method:

```javascript
omneoClient.benefits.get(1423)
    .then((benefit) => {
        console.log(benefit)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Benefits

To retrieve a list of benefits, use the `list` method:

```javascript
omneoClient.benefits.list()
  .then((benefits) => {
    console.log(benefits)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Create Benefit

To create a new benefit, use the `create` method:

```javascript
const payload = {
    name: 'New Benefit',
    description: 'Benefit description',
    value: 100
}

omneoClient.benefits.create(payload)
    .then((benefit) => {
        console.log(benefit)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Benefit

To update a specific benefit, use the `update` method:

```javascript
const payload = {
    name: 'Updated Benefit',
    value: 150
}

omneoClient.benefits.update(1342, payload)
    .then((benefit) => {
        console.log(benefit)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Benefit

To delete a benefit, use the `delete` method:

```javascript
omneoClient.benefits.delete(1342)
    .then(() => {
        console.log('Benefit deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```

### Extend Benefits

To extend benefits, use the `extend` method:

```javascript
const payload = {
    ids: [1, 2, 3],
    extend_date: '2024-12-31',
    profile_id: 'profile123',
}

omneoClient.benefits.extend(payload)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Count Benefits

To count benefits, use the `count` method:

```javascript
omneoClient.benefits.count()
    .then(({ countAll, countRedeemed }) => {
        console.log({ countAll, countRedeemed })
    })
    .catch((error) => {
        console.error(error)
    })
```