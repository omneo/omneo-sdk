
### Get Region

To retrieve a specific region, use the `get` method:

```javascript
omneoClient.regions.get(1423)
    .then((region) => {
        console.log(region);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Regions

To retrieve a list of regions, use the `list` method:

```javascript
omneoClient.regions.list()
    .then((regions) => {
        console.log(regions);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create region

To create a new region, use the `create` method:

```javascript

const payload = {
  name: 'My Region',
  handle: 'my_region'
}

omneoClient.regions.create(payload)
    .then((region) => {
        console.log(region);
    })
    .catch((error) => {
        console.error(error);
    });
```
### Update region

To update a specific region, use the `update` method:

```javascript

const payload = {
  name: 'My Region 2',
}

omneoClient.regions.update(1342, payload)
    .then((region) => {
        console.log(region);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete region

To delete a region, use the `delete` method:

```javascript
omneoClient.regions.delete(1342)
    .then(() => {
        console.log('region deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```