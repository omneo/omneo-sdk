### Get trigger

To retrieve a specific trigger, use the `get` method:

```javascript
omneoClient.triggers.get(1423)
    .then((trigger) => {
        console.log(trigger);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List triggers

To retrieve a list of triggers, use the `list` method:

```javascript
omneoClient.triggers.list()
    .then((triggers) => {
        console.log(triggers);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create trigger

To create a new trigger, use the `create` method:

```javascript

const payload = {
  name: 'My trigger',
  trigger: 'event_trigger',
  actions: [
    {
      type: 'email',
      params: {
        subject: 'Welcome',
        body: 'Welcome to our service!'
      }
    }
  ]
}

omneoClient.triggers.create(payload)
    .then((trigger) => {
        console.log(trigger);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Update trigger

To update a specific trigger, use the `update` method:

```javascript

const payload = {
  name: 'Updated trigger',
  trigger: 'updated_event_trigger'
}

omneoClient.triggers.update(1342, payload)
    .then((trigger) => {
        console.log(trigger);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete trigger

To delete an trigger, use the `delete` method:

```javascript
omneoClient.triggers.delete(1342)
    .then(() => {
        console.log('trigger deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```

### List actions

To retrieve a list of actions for a specific trigger, use the `listActions` method:

```javascript
omneoClient.triggers.listActions(1423)
  .then((actions) => {
    console.log(actions);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Create action

To create a new action for a specific trigger, use the `createAction` method:

```javascript
const payload = {
  type: 'email',
  params: {
  subject: 'Welcome',
  body: 'Welcome to our service!'
  }
}

omneoClient.triggers.createAction(1423, payload)
  .then((action) => {
    console.log(action);
  })
  .catch((error) => {
    console.error(error);
  });
```