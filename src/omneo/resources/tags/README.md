
### Get Tag

To retrieve a specific tag, use the `get` method:

```javascript
tags.get(1423)
    .then((tag) => {
        console.log(tag);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Tags

To retrieve a list of tags, use the `list` method:

```javascript
tags.list()
    .then((tags) => {
        console.log(tags);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create Tag

To create a new tag, use the `create` method:

```javascript
const newTag = {
    name: 'My Tag',
    // other properties
};

tags.create(newTag)
    .then((tag) => {
        console.log(tag);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete Tag

To delete a tag, use the `delete` method:

```javascript
tags.delete(1432)
    .then(() => {
        console.log('Tag deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```

