## Appointment Definitions

Manage appointment definitions, the bookable services behind appointments: duration, booking type, opening hours, locations, staff, capacity, booking questionnaires, notifications and visibility.

Nested resources:

- [Locations](./locations/README.md)
- [Normal Hours](./normal-hours/README.md)
- [Special Hours](./special-hours/README.md)
- [Staff](./staff/README.md)

### Get Appointment Definition

Retrieves a specific appointment definition by ID, including its loaded `normal_hours`, `special_hours`, `locations`, `staff` and `booking_questionnaire` relations.

```javascript
omneoClient.appointmentDefinitions.get(1)
    .then((definition) => {
        console.log(definition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### List Appointment Definitions

Retrieves a list of all appointment definitions. Customer-facing lists usually filter `filter[is_published]=1&filter[is_archived]=0`.

```javascript
const params = {
    'filter[is_published]': 1,
    'filter[is_archived]': 0
}

omneoClient.appointmentDefinitions.list(params)
    .then((definitions) => {
        console.log(definitions)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Create Appointment Definition

Creates a new appointment definition. Only `handle`, `name`, `duration_minutes` and `booking_type` (`instant`, `approval_required` or `walk_in_only`) are required. Opening hours, locations and staff can be attached inline or through the nested resources later.

```javascript
const payload = {
    handle: 'bra-fitting',
    name: 'Bra fitting',
    duration_minutes: 30,
    booking_type: 'approval_required',
    requires_staff: true,
    use_staff_from_location: true,
    location_ids: [13],
    normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
    ],
    is_published: false
}

omneoClient.appointmentDefinitions.create(payload)
    .then((definition) => {
        console.log(definition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Update Appointment Definition

Updates an existing appointment definition by ID, for example to publish it or attach notification targets.

```javascript
const payload = {
    is_published: true,
    reminder_target_id: 43,
    notify_reminder_offset_days: 1
}

omneoClient.appointmentDefinitions.update(1, payload)
    .then((definition) => {
        console.log(definition)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Delete Appointment Definition

Deletes an appointment definition by ID. To retire a definition while keeping its history, set `is_archived: true` instead.

```javascript
omneoClient.appointmentDefinitions.delete(1)
    .then(() => {
        console.log('appointment definition deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```

### Get Appointment Definition Questions

Retrieves the active booking questionnaire form slots to render for a definition.

```javascript
omneoClient.appointmentDefinitions.getQuestions(1)
    .then(({ questionnaire, questions }) => {
        console.log(questionnaire, questions)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Available Slots

Retrieves bookable slots for a definition at a location on a date. Pass `staff_id` for staff-required definitions. An empty `slots` array means the day is closed or fully booked. The `meta` block echoes the definition settings that shaped the calculation.

```javascript
const payload = {
    location_id: 13,
    date: '2026-05-11'
}

omneoClient.appointmentDefinitions.availableSlots(1, payload)
    .then(({ data, meta }) => {
        console.log(data.slots, meta)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Available Slots Range

Retrieves bookable slots across a date range (capped at 31 days), for calendar views.

```javascript
const payload = {
    location_id: 13,
    start_date: '2026-05-11',
    end_date: '2026-05-17'
}

omneoClient.appointmentDefinitions.availableSlotsRange(1, payload)
    .then(({ data, meta }) => {
        console.log(data, meta)
    })
    .catch((error) => {
        console.error(error)
    })
```

### Available Staff

Retrieves the eligible staff for a definition at a location on a date, to populate a staff picker. Each staff member reports `has_available_slots`.

```javascript
const payload = {
    location_id: 13,
    date: '2026-05-11'
}

omneoClient.appointmentDefinitions.availableStaff(1, payload)
    .then(({ data, meta }) => {
        console.log(data, meta)
    })
    .catch((error) => {
        console.error(error)
    })
```
