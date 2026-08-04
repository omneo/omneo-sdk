## Profile Appointments

Manage the signed-in customer's appointments through the ID API. All routes are scoped to `/profiles/me`, so no profile ID is needed.

### Get Appointment

Retrieves one of the customer's appointments by ID.

```javascript
IDClient.profile.appointments.get(5012)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Appointments

Retrieves the customer's appointments. Pass `filter[status]` to narrow the results.

```javascript
const params = {
    'filter[status]': 'confirmed'
}

IDClient.profile.appointments.list(params)
    .then((appointments) => {
        console.log(appointments)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment

Books an appointment for the customer. Times are sent in the request `timezone` and stored in UTC.

```javascript
const payload = {
    appointment_definition_id: 1,
    location_id: 13,
    scheduled_start_at: '2026-05-11 10:00:00',
    scheduled_end_at: '2026-05-11 10:30:00',
    timezone: 'Australia/Melbourne'
}

IDClient.profile.appointments.create(payload)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment

Updates or reschedules one of the customer's appointments, for example cancelling it.

```javascript
IDClient.profile.appointments.update(5012, { status: 'cancelled' })
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment

Deletes one of the customer's appointments.

```javascript
IDClient.profile.appointments.delete(5012)
    .then(() => {
        console.log('appointment deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Visible Appointment Definitions

Retrieves the published, non-archived appointment definitions visible to the customer, for rendering a booking flow.

```javascript
IDClient.profile.appointments.listVisibleDefinitions()
    .then((definitions) => {
        console.log(definitions)
    })
    .catch((error) => {
        console.error(error)
    })
```
