import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { Appointment, CreateAppointmentInput } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let instantDefinitionID: number
let approvalDefinitionID: number
let locationID: number
let profileID: string

const ALL_WEEK_HOURS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => {
  return { day_of_week: day, available_from: '09:00', available_until: '17:00' }
})

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  locationID = locations[0].id

  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Appointment Test',
    email: `${getRandomString('sdk_unit_test_create_appointment')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  const instantDefinition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_create_appointment_instant_handle'),
    name: getRandomString('sdk_unit_test_create_appointment_instant_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    min_lead_minutes: 0,
    is_published: true,
    location_ids: [locationID],
    normal_hours: ALL_WEEK_HOURS
  }).then(({ data }) => data)
  instantDefinitionID = instantDefinition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(instantDefinition.id)

  const approvalDefinition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_create_appointment_approval_handle'),
    name: getRandomString('sdk_unit_test_create_appointment_approval_name'),
    duration_minutes: 30,
    booking_type: 'approval_required',
    min_lead_minutes: 0,
    is_published: true,
    location_ids: [locationID],
    normal_hours: ALL_WEEK_HOURS
  }).then(({ data }) => data)
  approvalDefinitionID = approvalDefinition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(approvalDefinition.id)
})

describe('Create Appointment', () => {
  test('SDK Create Appointment against an instant definition is confirmed', async () => {
    const payload: CreateAppointmentInput = {
      appointment_definition_id: instantDefinitionID,
      profile_id: profileID,
      location_id: locationID,
      scheduled_start_at: `${futureDate(3)} 10:00:00`,
      scheduled_end_at: `${futureDate(3)} 10:30:00`,
      timezone: 'Australia/Melbourne',
      notes: 'SDK unit test appointment'
    }

    const appointment: Appointment = await omneoClient.appointments.create(payload).catch((err) => {
      console.error('SDK Create Appointment failed:', err)
      throw new Error('SDK Create Appointment failed')
    })
    CREATED_APPOINTMENT_IDS.push(appointment.id)

    expect(appointment).toBeDefined()
    expect(appointment.appointment_definition_id).toBe(instantDefinitionID)
    expect(appointment.profile_id).toBe(profileID)
    expect(appointment.location_id).toBe(locationID)
    expect(appointment.timezone).toBe(payload.timezone)
    expect(appointment.notes).toBe(payload.notes)
    expect(appointment.status).toBe('confirmed')
    expect(appointment.confirmed_at).not.toBeNull()
    // Scheduled times are sent in the request timezone and returned in UTC
    expect(appointment.scheduled_start_at).toBeDefined()
    expect(new Date(appointment.scheduled_start_at).getTime()).not.toBeNaN()
  })

  test('SDK Create Appointment against an approval_required definition is requested', async () => {
    const payload: CreateAppointmentInput = {
      appointment_definition_id: approvalDefinitionID,
      profile_id: profileID,
      location_id: locationID,
      scheduled_start_at: `${futureDate(4)} 11:00:00`,
      scheduled_end_at: `${futureDate(4)} 11:30:00`,
      timezone: 'Australia/Melbourne'
    }

    const appointment: Appointment = await omneoClient.appointments.create(payload).catch((err) => {
      console.error('SDK Create Appointment (approval) failed:', err)
      throw new Error('SDK Create Appointment (approval) failed')
    })
    CREATED_APPOINTMENT_IDS.push(appointment.id)

    expect(appointment).toBeDefined()
    expect(appointment.status).toBe('requested')
    expect(appointment.confirmed_at).toBeNull()
  })
})

afterAll(async () => {
  for (const id of CREATED_APPOINTMENT_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/appointments/${id}`)
    if (response.status === 204) {
      console.log(`SDK Appointment ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Appointment ID ${id}`, response)
    }
  }
  for (const id of CREATED_APPOINTMENT_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/appointment-definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Appointment Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Appointment Definition ID ${id}`, response)
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
