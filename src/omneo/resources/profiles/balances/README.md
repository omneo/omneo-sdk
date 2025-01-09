### Get Profile Balances

```javascript
const profileID = 'profile123';

omneoClient.profiles.balances.get(profileID)
    .then((data) => {
        // handle response data
    })
    .catch((error) => {
        // handle error
    });
```

