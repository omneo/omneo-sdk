### Get List Share

To retrieve a specific list share by handle, use the `get` method:

```javascript
omneoClient.lists.shares
  .get('share-handle')
  .then((share) => {
    console.log(share)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Get List Share (No Profile)

To retrieve a specific list share without profile data, use the `getNoProfile` method:

```javascript
omneoClient.lists.shares
  .getNoProfile('share-handle')
  .then((share) => {
    console.log(share)
  })
  .catch((error) => {
    console.error(error)
  })
```
