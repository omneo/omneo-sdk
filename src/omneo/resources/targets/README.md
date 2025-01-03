
### Get Target

To retrieve a specific target, use the `get` method:

```javascript
omneoClient.targets.get(1423)
    .then((target) => {
        console.log(target);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Targets

To retrieve a list of targets, use the `list` method:

```javascript
omneoClient.targets.list()
    .then((targets) => {
        console.log(targets);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create Target

To create a new target, use the `create` method:

```javascript
const newTarget = {
    name: 'My Target',
    // other properties
};

omneoClient.targets.create(newTarget)
    .then((target) => {
        console.log(target);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Update Target

To update an existing target, use the `update` method:

```javascript
const updatedTarget = {
    name: 'Updated Target',
    // other properties
};

omneoClient.targets.update(1423, updatedTarget)
    .then((target) => {
        console.log(target);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete Target

To delete a target, use the `delete` method:

```javascript
omneoClient.targets.delete(1432)
    .then(() => {
        console.log('Target deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```