## Appointment Definition Special Hours

Manage a definition's dated opening-hours overrides, such as public holidays. A special hour takes precedence over the normal hour when a date matches.

### List Appointment Definition Special Hours

Retrieves the dated overrides for a definition.

```javascript
omneoClient.appointmentDefinitions.specialHours.list(1)
    .then((specialHours) => {
        console.log(specialHours)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Appointment Definition Special Hour

Retrieves a specific override by ID.

```javascript
omneoClient.appointmentDefinitions.specialHours.get(1, 88)
    .then((specialHour) => {
        console.log(specialHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Definition Special Hour

Adds one dated override.

```javascript
const payload = {
    name: 'Public holiday',
    start_at: '2026-12-25',
    end_at: '2026-12-25',
    is_repeating: false,
    available_from: '10:00',
    available_until: '14:00'
}

omneoClient.appointmentDefinitions.specialHours.create(1, payload)
    .then((specialHour) => {
        console.log(specialHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Definition Special Hour

Updates an override by ID.

```javascript
omneoClient.appointmentDefinitions.specialHours.update(1, 88, { available_until: '15:00' })
    .then((specialHour) => {
        console.log(specialHour)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Definition Special Hour

Deletes an override by ID.

```javascript
omneoClient.appointmentDefinitions.specialHours.delete(1, 88)
    .then(() => {
        console.log('appointment definition special hour deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
