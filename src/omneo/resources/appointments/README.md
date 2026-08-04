## Appointments

Manage appointments, which are bookings made against an appointment definition. Setting `status` to `cancelled` preserves the record with its `cancelled_at` timestamp, which is usually preferable to deleting for reporting.

### Get Appointment

Retrieves a specific appointment by ID.

```javascript
omneoClient.appointments.get(1)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Appointments

Retrieves a list of all appointments. Supports filters such as `filter[profile_id]`, `filter[appointment_definition_id]`, `filter[status]`, `filter[location_id]` and `filter[assigned_staff_id]`.

```javascript
const params = {
    'filter[status]': 'confirmed'
}

omneoClient.appointments.list(params)
    .then((appointments) => {
        console.log(appointments)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment

Creates a new appointment. Times are sent in the request `timezone` and stored in UTC. Pass `assigned_staff_id` when the definition requires staff, and `answers` to capture booking questionnaire answers (create only).

```javascript
const payload = {
    appointment_definition_id: 1,
    profile_id: 'a1b460b2-953f-4587-b4eb-fb0f29b55e02',
    location_id: 13,
    scheduled_start_at: '2026-05-11 10:00:00',
    scheduled_end_at: '2026-05-11 10:30:00',
    timezone: 'Australia/Melbourne'
}

omneoClient.appointments.create(payload)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment

Updates an existing appointment by ID. Sending a `status` stamps the matching timestamp automatically (for example `confirmed` sets `confirmed_at`). Attach a transaction or order with a resolver object, or send `null` to detach.

```javascript
const payload = {
    status: 'completed',
    transaction: { receipt_ref: 'R-88123' }
}

omneoClient.appointments.update(1, payload)
    .then((appointment) => {
        console.log(appointment)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment

Deletes an appointment by ID.

```javascript
omneoClient.appointments.delete(1)
    .then(() => {
        console.log('appointment deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```

### Link Appointment

Links an additional profile or list to an appointment, separate from the profile the appointment is booked for. Linking is idempotent.

```javascript
omneoClient.appointments.link(1, { type: 'profile', id: 'b2c571c3-a64f-4698-c5fc-0c1a30c66f13' })
    .then((appointment) => {
        console.log(appointment.links)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Unlink Appointment

Removes a linked profile or list from an appointment.

```javascript
omneoClient.appointments.unlink(1, { type: 'list', id: 204 })
    .then(() => {
        console.log('appointment unlinked successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
