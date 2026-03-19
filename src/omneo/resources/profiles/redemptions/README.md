## Profile Redemptions

Manage a profile's redemptions.

### Get Profile Redemption

Gets a redemption by ID for a profile.

```javascript
const profileId = 'profile123'
const redemptionId = 123

omneoClient.profiles.redemptions.get(profileId, redemptionId)
    .then((response) => {
        console.log('Redemption:', response)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
```

### List Profile Redemptions

Lists redemptions for a profile.

```javascript
const profileId = 'profile123'
const params = {
    'page[size]': 20,
    'page[number]': 1
}

omneoClient.profiles.redemptions.list(profileId, params)
    .then((response) => {
        // paginated response
        console.log('Redemptions:', response)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
```

### Count Profile Redemptions

Gets redemption count by type and item id for a profile.

```javascript
const profileId = 'profile123'
const redemptionType = 'rewards' // RedemptionType
const id = 1

omneoClient.profiles.redemptions.count(profileId, redemptionType, id)
    .then((response) => {
        // { count: number }
        console.log('Redemption count:', response.count)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
```
