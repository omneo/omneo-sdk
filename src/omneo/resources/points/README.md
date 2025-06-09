### Get Point

```javascript
const pointId = '12345';
const params = {
    // request parameters
};

omneo.points.get(pointId, params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### List Points

```javascript
const params = {
    // request parameters
};

omneoClient.points.list(params)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

### Create Point

```javascript
const pointInput = {
    // point input data
};

omneoClient.points.create(pointInput)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

