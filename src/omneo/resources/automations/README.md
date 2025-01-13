
### Get Automation

To retrieve a specific automation, use the `get` method:

```javascript
omneoClient.automations.get(1423)
    .then((automation) => {
        console.log(automation);
    })
    .catch((error) => {
        console.error(error);
    });
```

### List Automations

To retrieve a list of automations, use the `list` method:

```javascript
omneoClient.automations.list()
    .then((automations) => {
        console.log(automations);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Create Automation

To create a new automation, use the `create` method:

```javascript

const payload = {
  name: 'My Automation',
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

omneoClient.automations.create(payload)
    .then((automation) => {
        console.log(automation);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Update Automation

To update a specific automation, use the `update` method:

```javascript

const payload = {
  name: 'Updated Automation',
  trigger: 'updated_event_trigger',
  actions: [
    {
      type: 'sms',
      params: {
        message: 'Your order has been shipped!'
      }
    }
  ]
}

omneoClient.automations.update(1342, payload)
    .then((automation) => {
        console.log(automation);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Delete Automation

To delete an automation, use the `delete` method:

```javascript
omneoClient.automations.delete(1342)
    .then(() => {
        console.log('Automation deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```