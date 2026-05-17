### Get List

To retrieve a specific list, use the `get` method:

```javascript
omneoClient.lists
  .get(2981)
  .then((list) => {
    console.log(list)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Search Lists

To search for lists, use the `search` method:

```javascript
omneoClient.lists
  .search({ name: 'Gift Registry' })
  .then((lists) => {
    console.log(lists)
  })
  .catch((error) => {
    console.error(error)
  })
```
