
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


### Search Profile by Identifier

To search for a profile with an identifier, use the `searchProfile` method:
This will return any profile that has an identity with a matching identifier, regardless of the identity's handle.

```javascript
omneoClient.identities.searchProfile()
    .then((profiles) => {
        console.log(`found ${profiles.length} profiles`);
    })
    .catch((error) => {
        console.error(error);
    });
```


