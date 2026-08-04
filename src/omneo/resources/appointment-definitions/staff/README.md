## Appointment Definition Staff

Manage the explicit staff attached to an appointment definition. Only used when the definition has `use_staff_from_location: false`; otherwise availability draws from the location's staff.

### List Appointment Definition Staff

Retrieves the staff attached to a definition.

```javascript
omneoClient.appointmentDefinitions.staff.list(1)
    .then((staff) => {
        console.log(staff)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Appointment Definition Staff

Retrieves a specific staff attachment by ID.

```javascript
omneoClient.appointmentDefinitions.staff.get(1, 700)
    .then((staff) => {
        console.log(staff)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Definition Staff

Attaches a staff member (by their profile UUID) to the definition.

```javascript
const payload = {
    staff_id: 'c3d582d4-b75f-47a9-d6fd-1d2b41d77e24',
    is_active: true
}

omneoClient.appointmentDefinitions.staff.create(1, payload)
    .then((staff) => {
        console.log(staff)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Definition Staff

Updates a staff attachment, for example to deactivate it.

```javascript
omneoClient.appointmentDefinitions.staff.update(1, 700, { is_active: false })
    .then((staff) => {
        console.log(staff)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Definition Staff

Removes a staff attachment from the definition.

```javascript
omneoClient.appointmentDefinitions.staff.delete(1, 700)
    .then(() => {
        console.log('appointment definition staff deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
