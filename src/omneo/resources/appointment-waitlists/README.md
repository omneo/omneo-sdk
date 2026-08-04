## Appointment Waitlists

Manage waitlist entries for customers registering interest when no suitable slot is available. An entry moves through `active`, then `fulfilled` (when an appointment is created and linked) or `cancelled`.

### Get Appointment Waitlist

Retrieves a specific waitlist entry by ID.

```javascript
omneoClient.appointmentWaitlists.get(1)
    .then((waitlistEntry) => {
        console.log(waitlistEntry)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Appointment Waitlists

Retrieves a list of all waitlist entries. Supports filters such as `filter[status]`, `filter[profile_id]` and `filter[appointment_definition_id]`.

```javascript
const params = {
    'filter[status]': 'active'
}

omneoClient.appointmentWaitlists.list(params)
    .then((waitlistEntries) => {
        console.log(waitlistEntries)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Waitlist

Registers a customer's interest for a definition at a location, optionally with a desired start time.

```javascript
const payload = {
    appointment_definition_id: 1,
    profile_id: 'a1b460b2-953f-4587-b4eb-fb0f29b55e02',
    location_id: 13,
    desired_start_at: '2026-05-11 10:00:00'
}

omneoClient.appointmentWaitlists.create(payload)
    .then((waitlistEntry) => {
        console.log(waitlistEntry)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Waitlist

Updates a waitlist entry, for example fulfilling it with the appointment created for the customer.

```javascript
const payload = {
    status: 'fulfilled',
    appointment_id: 5012
}

omneoClient.appointmentWaitlists.update(1, payload)
    .then((waitlistEntry) => {
        console.log(waitlistEntry)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Waitlist

Deletes a waitlist entry by ID.

```javascript
omneoClient.appointmentWaitlists.delete(1)
    .then(() => {
        console.log('appointment waitlist deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
