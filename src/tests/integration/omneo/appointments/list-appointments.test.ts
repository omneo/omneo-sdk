import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentResponse } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let profileID: string
let seededAppointmentID: number

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Appointment Test',
    email: `${getRandomString('sdk_unit_test_list_appointments')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_list_appointments_handle'),
    name: getRandomString('sdk_unit_test_list_appointments_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    min_lead_minutes: 0,
    is_published: true,
    location_ids: [locations[0].id]
  }).then(({ data }) => data)
  definitionID = definition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

  const appointment = await simpleOmneoRequest('POST', '/appointments', {
    appointment_definition_id: definitionID,
    profile_id: profileID,
    location_id: locations[0].id,
    scheduled_start_at: `${futureDate(3)} 10:00:00`,
    scheduled_end_at: `${futureDate(3)} 10:30:00`,
    timezone: 'Australia/Melbourne'
  }).then(({ data }) => data)
  seededAppointmentID = appointment.id
  CREATED_APPOINTMENT_IDS.push(appointment.id)
})

describe('List Appointments', () => {
  test('SDK List Appointments filtered by profile', async () => {
    const response: AppointmentResponse = await omneoClient.appointments.list({
      'filter[profile_id]': profileID
    }).catch((err) => {
      console.error('SDK List Appointments failed:', err)
      throw new Error('SDK List Appointments failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBe(1)
    expect(response.data[0].id).toBe(seededAppointmentID)
  })

  test('SDK List Appointments filtered by definition and status', async () => {
    const response: AppointmentResponse = await omneoClient.appointments.list({
      'filter[appointment_definition_id]': definitionID,
      'filter[status]': 'confirmed'
    }).catch((err) => {
      console.error('SDK List Appointments by definition failed:', err)
      throw new Error('SDK List Appointments by definition failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBe(1)
    expect(response.data[0].appointment_definition_id).toBe(definitionID)
    expect(response.data[0].status).toBe('confirmed')
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
