import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { Appointment } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let locationID: number
let profileID: string
let otherProfileID: string

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  locationID = locations[0].id

  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Profile Appointment Test',
    email: `${getRandomString('sdk_unit_test_profile_appointments')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  const otherProfile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Other Profile',
    email: `${getRandomString('sdk_unit_test_profile_appointments_other')}@omneodemo.com`
  }).then(({ data }) => data)
  otherProfileID = otherProfile.id
  CREATED_PROFILE_IDS.push(otherProfile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_profile_appointments_handle'),
    name: getRandomString('sdk_unit_test_profile_appointments_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    min_lead_minutes: 0,
    is_published: true,
    location_ids: [locationID]
  }).then(({ data }) => data)
  definitionID = definition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)
})

describe('Manage Profile Appointments', () => {
  let appointment: Appointment

  test('SDK Create Profile Appointment infers profile from the URL', async () => {
    appointment = await omneoClient.profiles.appointments.create(profileID, {
      appointment_definition_id: definitionID,
      location_id: locationID,
      scheduled_start_at: `${futureDate(3)} 10:00:00`,
      scheduled_end_at: `${futureDate(3)} 10:30:00`,
      timezone: 'Australia/Melbourne'
    }).catch((err) => {
      console.error('SDK Create Profile Appointment failed:', err)
      throw new Error('SDK Create Profile Appointment failed')
    })
    CREATED_APPOINTMENT_IDS.push(appointment.id)

    expect(appointment).toBeDefined()
    expect(appointment.profile_id).toBe(profileID)
    expect(appointment.appointment_definition_id).toBe(definitionID)
  })

  test('SDK List Profile Appointments', async () => {
    const response = await omneoClient.profiles.appointments.list(profileID).catch((err) => {
      console.error('SDK List Profile Appointments failed:', err)
      throw new Error('SDK List Profile Appointments failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((item) => item.id === appointment.id)).toBeDefined()
  })

  test('SDK Get Profile Appointment', async () => {
    const found = await omneoClient.profiles.appointments.get(profileID, appointment.id).catch((err) => {
      console.error('SDK Get Profile Appointment failed:', err)
      throw new Error('SDK Get Profile Appointment failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(appointment.id)
    expect(found.profile_id).toBe(profileID)
  })

  test('SDK Get Profile Appointment returns 404 for another profile', async () => {
    const error = await omneoClient.profiles.appointments.get(otherProfileID, appointment.id).then(() => null).catch((err) => err)
    expect(error).not.toBeNull()
  })

  test('SDK Update Profile Appointment', async () => {
    const updated = await omneoClient.profiles.appointments.update(profileID, appointment.id, {
      notes: 'SDK unit test updated note'
    }).catch((err) => {
      console.error('SDK Update Profile Appointment failed:', err)
      throw new Error('SDK Update Profile Appointment failed')
    })

    expect(updated).toBeDefined()
    expect(updated.id).toBe(appointment.id)
    expect(updated.notes).toBe('SDK unit test updated note')
  })

  test('SDK Delete Profile Appointment', async () => {
    await omneoClient.profiles.appointments.delete(profileID, appointment.id).catch((err) => {
      console.error('SDK Delete Profile Appointment failed:', err)
      throw new Error('SDK Delete Profile Appointment failed')
    })

    const response = await simpleOmneoRequest('GET', `/appointments/${appointment.id}`)
    expect(response.status).toBe(404)
    CREATED_APPOINTMENT_IDS.length = 0
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
