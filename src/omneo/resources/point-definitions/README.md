
## Point Definitions

Manage point definitions, which control how points are issued to profiles.

### Get Point Definition

Retrieves a specific point definition by ID.

```javascript
omneoClient.pointDefinitions.get(1)
    .then((pointDefinition) => {
        console.log(pointDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Point Definitions

Retrieves a list of all point definitions.

```javascript
const params = {
    // optional request parameters
}

omneoClient.pointDefinitions.list(params)
    .then((pointDefinitions) => {
        console.log(pointDefinitions)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Point Definition

Creates a new point definition.

```javascript
const payload = {
    name: 'Spend Points',
    handle: 'spend-points',
    region_id: null,
    currency: null,
    description: null,
    notes: null,
    is_reassignable: false,
    issue_period: null,
    issue_period_type: null,
    issue_absolute_expiry: null,
    tags: []
}

omneoClient.pointDefinitions.create(payload)
    .then((pointDefinition) => {
        console.log(pointDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Point Definition

Updates an existing point definition by ID.

```javascript
const payload = {
    name: 'Updated Spend Points'
}

omneoClient.pointDefinitions.update(1, payload)
    .then((pointDefinition) => {
        console.log(pointDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Point Definition

Deletes a point definition by ID.

```javascript
omneoClient.pointDefinitions.delete(1)
    .then(() => {
        console.log('point definition deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```