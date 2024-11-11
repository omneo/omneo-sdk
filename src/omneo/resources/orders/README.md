### Get Order

```javascript
const orderId = '12345';
const params = {
    // request parameters
};

omneoClient.orders.get(orderId, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Orders

```javascript
const params = {
    // request parameters
};

omneoClient.orders.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Order

```javascript
const body = {
    // request body
};

omneoClient.orders.create(body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Update Order

```javascript
const orderId = '12345';
const body = {
    // request body
};

omneoClient.orders.update(orderId, body)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Delete Order

```javascript
const orderId = '12345';

omneoClient.orders.delete(orderId)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```