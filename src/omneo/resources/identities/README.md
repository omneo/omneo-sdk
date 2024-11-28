
### List Identities

To retrieve a list of identities, use the `list` method:

```javascript
omneoClient.identities.list()
    .then((identities) => {
        console.log(identities);
    })
    .catch((error) => {
        console.error(error);
    });
```

