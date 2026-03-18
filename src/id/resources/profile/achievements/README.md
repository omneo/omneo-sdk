## Achievements

Profile achievement functionality for the current authenticated profile (`/profiles/me`).

### Get Achievement Points

Retrieves achievement points for an achievement definition.

```javascript
const achievementDefinitionId = '1'

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.achievements.getPoints(achievementDefinitionId)
  .then((response) => {
    // paginated response
    console.log('Achievement points:', response)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

### List Achievements

Retrieves achievements for the current profile.

```javascript
const params = {
  // optional request parameters
}

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.achievements.list(params)
  .then((response) => {
    // non-paginated response.data
    console.log('Achievements:', response)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

### Create Achievement

Creates an achievement record for the current profile.

```javascript
const body = {
  definition_id: 1,
  count: 200,
  meta: {
    manual: true,
    user: 'admin@omneo.io'
  }
}

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.achievements.create(body)
  .then((response) => {
    console.log('Created achievement:', response)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```