
### Get Country

To retrieve a specific country, use the `get` method:

```javascript
omneoClient.countries.get(1423)
    .then((country) => {
        console.log(country);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Countries

To retrieve a list of countries, use the `list` method:

```javascript
omneoClient.countries.list()
    .then((countries) => {
        console.log(countries);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create country

To create a new country, use the `create` method:

```javascript

const payload = {
  name: 'My Country',
  iso_2: 'Test_iso_2',
  iso_3: 'Test_iso_3',
  iso_numeric: '004010',
  sort_order: null
}

omneoClient.countries.create(payload)
    .then((country) => {
        console.log(country);
    })
    .catch((error) => {
        console.error(error);
    });
```
### Update country

To update a specific country, use the `update` method:

```javascript

const payload = {
  name: 'My Country',
  iso_2: 'Test_updated_iso_2',
  iso_3: 'Test_updated_iso_3',
  iso_numeric: '004010',
  sort_order: 134
}

omneoClient.countries.update(1342, payload)
    .then((country) => {
        console.log(country);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete country

To delete a country, use the `delete` method:

```javascript
omneoClient.countries.delete(1342)
    .then(() => {
        console.log('country deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```