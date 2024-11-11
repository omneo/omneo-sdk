### Get Interaction

The `get` method retrieves a specific interaction by its ID.

```javascript
const id = 'interactionId'
const params = { /* request parameters */ }

omneoClient.interactions.get(id, params)
    .then((interaction: Interaction) => {
        // Handle the retrieved interaction
    })
    .catch((error) => {
        // Handle any errors
    })
```

### List Interactions

The `list` method retrieves a list of omneoClient.interactions.

```javascript
const params = { /* request parameters */ }

omneoClient.interactions.list(params)
    .then((interactions: Interaction[]) => {
        // Handle the retrieved interactions
    })
    .catch((error) => {
        // Handle any errors
    })
```

### Create Interaction

The `create` method creates a new interaction.

```javascript
const body = { /* interaction data */ }

omneoClient.interactions.create(body)
    .then((interaction: Interaction) => {
        // Handle the created interaction
    })
    .catch((error) => {
        // Handle any errors
    })
```

### Update Interaction

The `update` method updates an existing interaction.

```javascript
const id = 'interactionId'
const body = { /* updated interaction data */ }

omneoClient.interactions.update(id, body)
    .then((interaction: Interaction) => {
        // Handle the updated interaction
    })
    .catch((error) => {
        // Handle any errors
    })
```

### Delete Interaction

The `delete` method deletes an interaction by its ID.

```javascript
const id = 'interactionId'

omneoClient.interactions.delete(id)
    .then(() => {
        // Handle the successful deletion
    })
    .catch((error) => {
        // Handle any errors
    })
```
