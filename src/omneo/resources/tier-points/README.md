
## Tier Points

Manage tier points, which are individual point records assigned to profiles.

### Get Tier Point

Retrieves a specific tier point by ID.

```javascript
const tierPointId = 123
omneoClient.tierPoints.get(tierPointId)
    .then((tierPoint) => {
        console.log(tierPoint)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Tier Points

Retrieves a list of all tier points.

```javascript
const params = {
    // optional request parameters
}

omneoClient.tierPoints.list(params)
    .then((tierPoints) => {
        console.log(tierPoints)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Tier Point

Creates a new tier point record for a profile.

```javascript
const payload = {
    profile_id: 'profile123',
    point_definition_id: 1,
    value: 100,
    issued_at: '2026-01-01 00:00:00',
    meta: null
}

omneoClient.tierPoints.create(payload)
    .then((tierPoint) => {
        console.log(tierPoint)
    })
    .catch((error) => {
        console.error(error)
    })
```