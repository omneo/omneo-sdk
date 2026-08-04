## Profile Achievements

Manage a profile's achievements.

### Get Achievement Points

Gets achievement points for a profile and achievement definition.

```javascript
const profileId = 'profile123'
const achievementDefinitionId = '1'

omneoClient.profiles.achievements.getPoints(profileId, achievementDefinitionId)
    .then((response) => {
        // paginated response
        console.log('Achievement points:', response)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
```

### List Profile Achievements

Lists achievements for a profile.

```javascript
const profileId = 'profile123'
const params = {
    // optional request params
}

omneoClient.profiles.achievements.list(profileId, params)
    .then((response) => {
        // non-paginated response.data
        console.log('Achievements:', response)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
```

### Create Profile Achievement

Creates an achievement record for a profile.

```javascript
const profileId = 'profile123'
const body = {
    definition_id: 1,
    count: 200,
    meta: {
        manual: true,
        user: 'admin@omneo.io'
    }
}

omneoClient.profiles.achievements.create(profileId, body)
    .then((response) => {
        console.log('Created achievement:', response)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
```
