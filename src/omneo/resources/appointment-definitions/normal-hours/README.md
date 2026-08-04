## Appointment Definition Normal Hours

Manage a definition's weekly opening-hours pattern, one entry per `day_of_week` (`MON`–`SUN`). Times are plain local times at the location.

### List Appointment Definition Normal Hours

Retrieves the weekly entries for a definition.

```javascript
omneoClient.appointmentDefinitions.normalHours.list(1)
    .then((normalHours) => {
        console.log(normalHours)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Appointment Definition Normal Hour

Retrieves a specific entry by ID.

```javascript
omneoClient.appointmentDefinitions.normalHours.get(1, 301)
    .then((normalHour) => {
        console.log(normalHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Definition Normal Hour

Adds one weekly entry.

```javascript
const payload = {
    day_of_week: 'MON',
    available_from: '09:00',
    available_until: '17:00'
}

omneoClient.appointmentDefinitions.normalHours.create(1, payload)
    .then((normalHour) => {
        console.log(normalHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Definition Normal Hour

Updates an entry by ID.

```javascript
omneoClient.appointmentDefinitions.normalHours.update(1, 301, { available_until: '18:00' })
    .then((normalHour) => {
        console.log(normalHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Definition Normal Hour

Deletes an entry by ID.

```javascript
omneoClient.appointmentDefinitions.normalHours.delete(1, 301)
    .then(() => {
        console.log('appointment definition normal hour deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
