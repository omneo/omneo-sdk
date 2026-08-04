## Profile Special Hours

Manage a profile's dated working-hours overrides, such as leave or a one-off change. A special hour takes precedence over the normal hour when a date matches.

### List Profile Special Hours

Retrieves the profile's dated overrides.

```javascript
omneoClient.profiles.specialHours.list('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24')
    .then((specialHours) => {
        console.log(specialHours)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Profile Special Hour

Retrieves a specific override by ID.

```javascript
omneoClient.profiles.specialHours.get('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', 88)
    .then((specialHour) => {
        console.log(specialHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Profile Special Hour

Adds one dated override.

```javascript
const payload = {
    name: 'Annual leave',
    start_at: '2026-12-24',
    end_at: '2026-12-26',
    is_repeating: false
}

omneoClient.profiles.specialHours.create('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', payload)
    .then((specialHour) => {
        console.log(specialHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Profile Special Hour

Updates an override by ID.

```javascript
omneoClient.profiles.specialHours.update('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', 88, { end_at: '2026-12-27' })
    .then((specialHour) => {
        console.log(specialHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Profile Special Hour

Deletes an override by ID.

```javascript
omneoClient.profiles.specialHours.delete('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', 88)
    .then(() => {
        console.log('profile special hour deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
