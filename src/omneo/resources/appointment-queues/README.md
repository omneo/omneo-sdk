## Appointment Queues

Manage walk-in queue entries for definitions that allow walk-ins. An entry moves through `waiting` → `called` → `served`, or `cancelled`. A served entry can be converted into an appointment by setting `appointment_id`.

### Get Appointment Queue

Retrieves a specific queue entry by ID.

```javascript
omneoClient.appointmentQueues.get(812)
    .then((queueEntry) => {
        console.log(queueEntry)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Appointment Queues

Retrieves a list of all queue entries. Supports filters such as `filter[status]`, `filter[location_id]` and `filter[appointment_definition_id]`.

```javascript
const params = {
    'filter[status]': 'waiting'
}

omneoClient.appointmentQueues.list(params)
    .then((queueEntries) => {
        console.log(queueEntries)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Queue

Checks a customer into the walk-in queue. Omit `profile_id` for an anonymous walk-in.

```javascript
const payload = {
    appointment_definition_id: 1,
    location_id: 13,
    profile_id: 'a1b460b2-953f-4587-b4eb-fb0f29b55e02',
    notes: 'Walk-in, wants a fitting'
}

omneoClient.appointmentQueues.create(payload)
    .then((queueEntry) => {
        console.log(queueEntry)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Queue

Advances a queue entry through its lifecycle, or links the appointment created for a served entry.

```javascript
omneoClient.appointmentQueues.update(812, { status: 'called' })
    .then((queueEntry) => {
        console.log(queueEntry)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Queue

Deletes a queue entry by ID.

```javascript
omneoClient.appointmentQueues.delete(812)
    .then(() => {
        console.log('appointment queue deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
