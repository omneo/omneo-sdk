
### List Identities

To retrieve a list of identities, use the `list` method:
We could also add params to list, like `?filter[handle]=handle&include=profile`

```javascript
omneoClient.identities.list()
    .then((identities) => {
        console.log(identities);
    })
    .catch((error) => {
        console.error(error);
    });
```

