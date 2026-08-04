## Profile Normal Hours

Manage a profile's weekly working-hours pattern, one entry per `day_of_week` (`MON`–`SUN`). For staff profiles, these hours gate individual availability on staff-required appointment definitions.

### List Profile Normal Hours

Retrieves the profile's weekly entries.

```javascript
omneoClient.profiles.normalHours.list('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24')
    .then((normalHours) => {
        console.log(normalHours)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Profile Normal Hour

Retrieves a specific entry by ID.

```javascript
omneoClient.profiles.normalHours.get('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', 301)
    .then((normalHour) => {
        console.log(normalHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Profile Normal Hour

Adds one weekly entry.

```javascript
const payload = {
    day_of_week: 'MON',
    available_from: '09:00',
    available_until: '17:00'
}

omneoClient.profiles.normalHours.create('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', payload)
    .then((normalHour) => {
        console.log(normalHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Profile Normal Hour

Updates an entry by ID.

```javascript
omneoClient.profiles.normalHours.update('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', 301, { available_until: '18:00' })
    .then((normalHour) => {
        console.log(normalHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Profile Normal Hour

Deletes an entry by ID.

```javascript
omneoClient.profiles.normalHours.delete('c3d582d4-b75f-47a9-d6fd-1d2b41d77e24', 301)
    .then(() => {
        console.log('profile normal hour deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
