### Get a Location

```javascript
omneoClient.locations.get(1)
    .then((location) => {
        console.log(location);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Locations

```javascript
omneoClient.locations.list()
    .then((locations) => {
        console.log(locations);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create a Location

```javascript
const newLocation = {
    name: 'New Location',
    address: '123 Main St',
    city: 'Example City',
    state: 'Example State',
    country: 'Example Country'
};

omneoClient.locations.create(newLocation)
    .then((location) => {
        console.log(location);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Update a Location

```javascript
const updatedLocation = {
    name: 'Updated Location',
    address: '456 Elm St',
    city: 'Example City',
    state: 'Example State',
    country: 'Example Country'
};

omneoClient.locations.update(1, updatedLocation)
    .then((location) => {
        console.log(location);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete a Location

```javascript
omneoClient.locations.delete(1)
    .then(() => {
        console.log('Location deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```