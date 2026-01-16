

### List Credits

```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
const params = {}
IDClient.profile.credits.list(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```


### Redeem Credit

```javascript

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
const creditId = 12345;
IDClient.profile.credits.redeem(creditId)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```