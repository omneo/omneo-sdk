# Automation Actions

This document provides examples of how to use the `AutomationActions` class to manage actions under an automation in your application.

## List Automation Actions

To retrieve a list of actions for an automation, use the `list` method:

```javascript
const automationId = 1

omneoClient.automations.actions
  .list(automationId)
  .then((actions) => {
    console.log(actions)
  })
  .catch((error) => {
    console.error(error)
  })
```

## Get Automation Action

To retrieve a specific action under an automation, use the `get` method:

```javascript
const automationId = 1
const actionId = 10

omneoClient.automations.actions
  .get(automationId, actionId)
  .then((action) => {
    console.log(action)
  })
  .catch((error) => {
    console.error(error)
  })
```

## Create Automation Action

To create a new action under an automation, use the `create` method:

```javascript
const automationId = 1

const payload = {
  name: 'send_email',
  sort_order: 1,
  arguments: [
    {
      name: 'template_handle',
      value: 'welcome-email',
      is_dynamic: false
    }
  ],
  description: 'Send welcome email action',
  notes: 'Created by SDK example'
}

omneoClient.automations.actions
  .create(automationId, payload)
  .then((action) => {
    console.log(action)
  })
  .catch((error) => {
    console.error(error)
  })
```

## Update Automation Action

To update an existing action under an automation, use the `update` method:

```javascript
const automationId = 1
const actionId = 10

const payload = {
  name: 'send_email_updated',
  description: 'Updated action description'
}

omneoClient.automations.actions
  .update(automationId, actionId, payload)
  .then((action) => {
    console.log(action)
  })
  .catch((error) => {
    console.error(error)
  })
```

## Delete Automation Action

To delete an action under an automation, use the `delete` method:

```javascript
const automationId = 1
const actionId = 10

omneoClient.automations.actions
  .delete(automationId, actionId)
  .then(() => {
    console.log('Automation action deleted successfully')
  })
  .catch((error) => {
    console.error(error)
  })
```
