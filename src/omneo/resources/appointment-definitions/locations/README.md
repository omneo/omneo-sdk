## Appointment Definition Locations

Manage the locations an appointment definition is offered at.

### List Appointment Definition Locations

Retrieves the location assignments for a definition.

```javascript
omneoClient.appointmentDefinitions.locations.list(1)
    .then((locations) => {
        console.log(locations)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Appointment Definition Location

Retrieves a specific location assignment by its assignment row ID.

```javascript
omneoClient.appointmentDefinitions.locations.get(1, 500)
    .then((location) => {
        console.log(location)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Definition Location

Offers the definition at a location.

```javascript
const payload = {
    location_id: 13,
    is_active: true
}

omneoClient.appointmentDefinitions.locations.create(1, payload)
    .then((location) => {
        console.log(location)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Definition Location

Updates a location assignment, for example to deactivate it. Note the update route resolves the location ID (here `13`), unlike get and delete which resolve the assignment row ID.

```javascript
omneoClient.appointmentDefinitions.locations.update(1, 13, { is_active: false })
    .then((location) => {
        console.log(location)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Definition Location

Removes a location assignment from the definition by its assignment row ID.

```javascript
omneoClient.appointmentDefinitions.locations.delete(1, 500)
    .then(() => {
        console.log('appointment definition location deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
