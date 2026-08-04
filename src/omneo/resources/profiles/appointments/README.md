## Profile Appointments

Manage appointments for a specific profile. The profile-scoped routes infer `profile_id` from the URL, and return 404 when an appointment does not belong to the profile.

### Get Profile Appointment

Retrieves one of the profile's appointments by ID.

```javascript
omneoClient.profiles.appointments.get('a1b460b2-953f-4587-b4eb-fb0f29b55e02', 5012)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Profile Appointments

Retrieves the profile's appointments. Pass `filter[status]` to narrow the results.

```javascript
const params = {
    'filter[status]': 'confirmed'
}

omneoClient.profiles.appointments.list('a1b460b2-953f-4587-b4eb-fb0f29b55e02', params)
    .then((appointments) => {
        console.log(appointments)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Profile Appointment

Books an appointment for the profile. `profile_id` comes from the URL, so it is not sent in the body.

```javascript
const payload = {
    appointment_definition_id: 1,
    location_id: 13,
    scheduled_start_at: '2026-05-11 10:00:00',
    scheduled_end_at: '2026-05-11 10:30:00',
    timezone: 'Australia/Melbourne'
}

omneoClient.profiles.appointments.create('a1b460b2-953f-4587-b4eb-fb0f29b55e02', payload)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Profile Appointment

Updates or reschedules one of the profile's appointments.

```javascript
omneoClient.profiles.appointments.update('a1b460b2-953f-4587-b4eb-fb0f29b55e02', 5012, { status: 'cancelled' })
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Profile Appointment

Deletes one of the profile's appointments.

```javascript
omneoClient.profiles.appointments.delete('a1b460b2-953f-4587-b4eb-fb0f29b55e02', 5012)
    .then(() => {
        console.log('profile appointment deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Visible Appointment Definitions

Retrieves the published, non-archived appointment definitions whose `visibility_condition` evaluates to true for the profile.

```javascript
omneoClient.profiles.appointments.listVisibleDefinitions('a1b460b2-953f-4587-b4eb-fb0f29b55e02')
    .then((definitions) => {
        console.log(definitions)
    })
    .catch((error) => {
        console.error(error)
    })
```
