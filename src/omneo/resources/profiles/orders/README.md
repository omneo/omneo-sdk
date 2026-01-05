### Get Order

```javascript
const profileID = 'profile123';
const orderID = 12345;

omneoClient.profiles.orders.get(profileID, orderID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```

### List Orders

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
    'filter[external_id]': payload.external_id
};

omneoClient.profiles.orders.list(profileID, params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```
### List Group Orders

```javascript
const profileID = 'profile123';
omneoClient.profiles.orders.listGroup(profileID)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```
