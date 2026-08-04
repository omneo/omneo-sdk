import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let appointmentID: number

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Appointment Test',
    email: `${getRandomString('sdk_unit_test_delete_appointment')}@omneodemo.com`
  }).then(({ data }) => data)
  CREATED_PROFILE_IDS.push(profile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_delete_appointment_handle'),
    name: getRandomString('sdk_unit_test_delete_appointment_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    min_lead_minutes: 0,
    is_published: true,
    location_ids: [locations[0].id]
  }).then(({ data }) => data)
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

  const appointment = await simpleOmneoRequest('POST', '/appointments', {
    appointment_definition_id: definition.id,
    profile_id: profile.id,
    location_id: locations[0].id,
    scheduled_start_at: `${futureDate(3)} 10:00:00`,
    scheduled_end_at: `${futureDate(3)} 10:30:00`,
    timezone: 'Australia/Melbourne'
  }).then(({ data }) => data)
  appointmentID = appointment.id
})

describe('Delete Appointment', () => {
  test('SDK Delete Appointment', async () => {
    await omneoClient.appointments.delete(appointmentID).catch((err) => {
      console.error('SDK Delete Appointment failed:', err)
      throw new Error('SDK Delete Appointment failed')
    })

    const response = await simpleOmneoRequest('GET', `/appointments/${appointmentID}`)
    expect(response.status).toBe(404)
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
  for (const id of CREATED_PROFILE_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/profiles/${id}`)
    if (response.status === 204 || response.data) {
      console.log(`SDK Profile ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Profile ID ${id}`, response)
    }
  }
})
