import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString, seedAppointmentTestLocation, DEFINITION_ALL_WEEK_HOURS, futureDate, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_LOCATION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let staffDefinitionID: number
let locationID: number
let staffProfileID: string

beforeAll(async () => {
  const location = await seedAppointmentTestLocation()
  locationID = location.id
  CREATED_LOCATION_IDS.push(location.id)

  const seeded = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_availability_handle'),
    name: getRandomString('sdk_unit_test_availability_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    min_lead_minutes: 0,
    max_advance_days: 30,
    slot_interval_minutes: 30,
    requires_staff: false,
    is_published: true,
    location_ids: [locationID],
    normal_hours: DEFINITION_ALL_WEEK_HOURS
  }).then(({ data }) => data)
  definitionID = seeded.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)

  // Staff-required definition with an explicit staff member whose own
  // profile hours gate their availability
  const staffProfile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Availability Staff',
    email: `${getRandomString('sdk_unit_test_availability_staff')}@omneodemo.com`
  }).then(({ data }) => data)
  staffProfileID = staffProfile.id
  CREATED_PROFILE_IDS.push(staffProfile.id)

  for (const day of ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']) {
    await simpleOmneoRequest('POST', `/profiles/${staffProfileID}/normal-hours`, {
      day_of_week: day,
      available_from: '09:00',
      available_until: '17:00'
    })
  }

  const staffSeeded = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_availability_staff_handle'),
    name: getRandomString('sdk_unit_test_availability_staff_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    min_lead_minutes: 0,
    slot_interval_minutes: 30,
    requires_staff: true,
    use_staff_from_location: false,
    is_published: true,
    location_ids: [locationID],
    staff_ids: [staffProfileID],
    normal_hours: DEFINITION_ALL_WEEK_HOURS
  }).then(({ data }) => data)
  staffDefinitionID = staffSeeded.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(staffSeeded.id)
})

describe('Appointment Availability', () => {
  test('SDK Browse Available Appointment Slots', async () => {
    const response = await omneoClient.appointmentDefinitions.availableSlots(definitionID, {
      location_id: locationID,
      date: futureDate(3)
    }).catch((err) => {
      console.error('SDK Browse Available Appointment Slots failed:', err)
      throw new Error('SDK Browse Available Appointment Slots failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(response.data.appointment_definition_id).toBe(definitionID)
    expect(response.data.location_id).toBe(locationID)
    expect(response.data.requires_staff).toBe(false)
    expect(Array.isArray(response.data.slots)).toBe(true)
    expect(response.data.slots.length).toBeGreaterThan(0)
    expect(response.data.slots[0]).toHaveProperty('start_at')
    expect(response.data.slots[0]).toHaveProperty('end_at')
    expect(response.data.slots[0].duration_minutes).toBe(30)
    expect(response.meta).toBeDefined()
    expect(response.meta.duration_minutes).toBe(30)
    expect(response.meta.slot_interval_minutes).toBe(30)
  })

  test('SDK Browse Available Appointment Slots over a Date Range', async () => {
    const response = await omneoClient.appointmentDefinitions.availableSlotsRange(definitionID, {
      location_id: locationID,
      start_date: futureDate(3),
      end_date: futureDate(5)
    }).catch((err) => {
      console.error('SDK Browse Available Appointment Slots Range failed:', err)
      throw new Error('SDK Browse Available Appointment Slots Range failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.meta).toBeDefined()
    expect(response.meta.appointment_definition_id).toBe(definitionID)
    expect(response.meta.start_date).toBe(futureDate(3))
    expect(response.meta.end_date).toBe(futureDate(5))
  })

  test('SDK Browse Available Appointment Staff', async () => {
    const response = await omneoClient.appointmentDefinitions.availableStaff(staffDefinitionID, {
      location_id: locationID,
      date: futureDate(3)
    }).catch((err) => {
      console.error('SDK Browse Available Appointment Staff failed:', err)
      throw new Error('SDK Browse Available Appointment Staff failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((staff) => staff.id === staffProfileID)).toBeDefined()
    expect(response.meta).toBeDefined()
    expect(response.meta.appointment_definition_id).toBe(staffDefinitionID)
    expect(response.meta.requires_staff).toBe(true)
  })

  test('SDK Browse Available Appointment Staff rejects a non-staff definition', async () => {
    const error = await omneoClient.appointmentDefinitions.availableStaff(definitionID, {
      location_id: locationID,
      date: futureDate(3)
    }).then(() => null).catch((err) => err)

    expect(error).not.toBeNull()
    expect(error?.errors?.requires_staff).toBeDefined()
  })
})

afterAll(async () => {
  for (const id of CREATED_APPOINTMENT_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/appointment-definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Appointment Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Appointment Definition ID ${id}`, response)
    }
  }
  for (const id of CREATED_LOCATION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/locations/${id}`)
    if (response.status === 204) {
      console.log(`SDK Location ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Location ID ${id}`, response)
    }
  }
  for (const id of CREATED_PROFILE_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/profiles/${id}`)
    if (response.status === 204 || response.data) {
      console.log(`SDK Profile ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Profile ID ${id}`, response)
    }
  }
})
