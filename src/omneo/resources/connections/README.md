
### Get Connection

To retrieve a specific connection, use the `get` method:

```javascript
omneoClient.connections.get(1423)
    .then((connection) => {
        console.log(connection);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Connections

To retrieve a list of connections, use the `list` method:

```javascript
omneoClient.connections.list()
    .then((connections) => {
        console.log(connections);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create Connection

To create a new connection, use the `create` method:

```javascript
const newConnection = {
    name: 'My Connection',
    // other properties
};

omneoClient.connections.create(newConnection)
    .then((connection) => {
        console.log(connection);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete Connection

To delete a connection, use the `delete` method:

```javascript
omneoClient.connections.delete(1432)
    .then(() => {
        console.log('Connection deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```