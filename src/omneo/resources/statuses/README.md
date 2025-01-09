
### Get Status

To retrieve a specific status, use the `get` method:

```javascript
statuses.get(1423)
    .then((status) => {
        console.log(status);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Statuses

To retrieve a list of statuses, use the `list` method:

```javascript
statuses.list()
    .then((statuses) => {
        console.log(statuses);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create Status

To create a new status, use the `create` method:

```javascript
const newStatus = {
    name: 'My Status',
    // other properties
};

statuses.create(newStatus)
    .then((status) => {
        console.log(status);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Update Status

To update an existing status, use the `update` method:

```javascript
const updatedStatus = {
    name: 'Updated Status',
    // other properties
};

statuses.update(1423, updatedStatus)
    .then((status) => {
        console.log(status);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete Status

To delete a status, use the `delete` method:

```javascript
statuses.delete(1432)
    .then(() => {
        console.log('Status deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```