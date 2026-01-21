

### List Credits

```javascript
const profileID = 'profile123';
const params = {
    // request parameters
};

omneoClient.profiles.credits.list(profileID, params)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```


### Redeem Credit

```javascript
const profileID = 'profile123';
const creditId = 12345;

omneoClient.profiles.credits.redeem(profileID, creditId)
    .then((data) => {
        // handle response data
        console.log('Response data:', data)
    })
    .catch((error) => {
        // handle error
        console.error('Error:', error)
    });
```