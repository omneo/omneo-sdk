
## Tier Definitions

Manage tier definitions, which define the tiers that profiles can be assigned to.

### Get Tier Definition

Retrieves a specific tier definition by ID.

```javascript
omneoClient.tierDefinitions.get(1)
    .then((tierDefinition) => {
        console.log(tierDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Tier Definitions

Retrieves a list of all tier definitions.

```javascript
const params = {
    // optional request parameters
}

omneoClient.tierDefinitions.list(params)
    .then((tierDefinitions) => {
        console.log(tierDefinitions)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Tier Definition

Creates a new tier definition.

```javascript
const payload = {
    name: 'Gold',
    handle: 'gold',
    value_min: 1000,
    value_maintain: 500,
    is_assignable: true,
    is_floor: false,
    description: null,
    short_description: null,
    long_description: null,
    terms_conditions: null,
    internal_notes: null,
    earn_instructions: null,
    icon: null,
    image_url: null,
    disable_credit: false,
    region_id: null,
    tags: [],
    meta: null
}

omneoClient.tierDefinitions.create(payload)
    .then((tierDefinition) => {
        console.log(tierDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Tier Definition

Updates an existing tier definition by ID.

```javascript
const payload = {
    name: 'Gold Plus',
    value_min: 1500
}

omneoClient.tierDefinitions.update(1, payload)
    .then((tierDefinition) => {
        console.log(tierDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Tier Definition

Deletes a tier definition by ID.

```javascript
omneoClient.tierDefinitions.delete(1)
    .then(() => {
        console.log('tier definition deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```