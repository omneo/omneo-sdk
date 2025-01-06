
### Get System

To retrieve a specific system, use the `get` method:

```javascript
systems.get(1423)
    .then((system) => {
        console.log(system);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Systems

To retrieve a list of systems, use the `list` method:

```javascript
systems.list()
    .then((systems) => {
        console.log(systems);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create System

To create a new system, use the `create` method:

```javascript
const newSystem = {
    name: 'My System',
    // other properties
};

systems.create(newSystem)
    .then((system) => {
        console.log(system);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete System

To delete a system, use the `delete` method:

```javascript
systems.delete(1432)
    .then(() => {
        console.log('System deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```
