import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentWaitlist, AppointmentWaitlistResponse } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_WAITLIST_IDS: number[] = []
const CREATED_APPOINTMENT_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let locationID: number
let profileID: string
let waitlistEntryID: number

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  locationID = locations[0].id

  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Waitlist Test',
    email: `${getRandomString('sdk_unit_test_manage_waitlist')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_manage_waitlist_handle'),
    name: getRandomString('sdk_unit_test_manage_waitlist_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    min_lead_minutes: 0,
    allow_waitlist: true,
    is_published: true,
    location_ids: [locationID]
  }).then(({ data }) => data)
  definitionID = definition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

  const waitlistEntry = await simpleOmneoRequest('POST', '/appointment-waitlists', {
    appointment_definition_id: definitionID,
    profile_id: profileID,
    location_id: locationID
  }).then(({ data }) => data)
  waitlistEntryID = waitlistEntry.id
  CREATED_APPOINTMENT_WAITLIST_IDS.push(waitlistEntry.id)
})

describe('Manage Appointment Waitlist', () => {
  test('SDK Get Appointment Waitlist', async () => {
    const waitlistEntry: AppointmentWaitlist = await omneoClient.appointmentWaitlists.get(waitlistEntryID).catch((err) => {
      console.error('SDK Get Appointment Waitlist failed:', err)
      throw new Error('SDK Get Appointment Waitlist failed')
    })

    expect(waitlistEntry).toBeDefined()
    expect(waitlistEntry.id).toBe(waitlistEntryID)
    expect(waitlistEntry.appointment_definition_id).toBe(definitionID)
    expect(waitlistEntry.status).toBe('active')
  })

  test('SDK List Appointment Waitlists', async () => {
    const response: AppointmentWaitlistResponse = await omneoClient.appointmentWaitlists.list({
      'filter[appointment_definition_id]': definitionID
    }).catch((err) => {
      console.error('SDK List Appointment Waitlists failed:', err)
      throw new Error('SDK List Appointment Waitlists failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((entry) => entry.id === waitlistEntryID)).toBeDefined()
  })

  test('SDK Update Appointment Waitlist to fulfilled with an appointment', async () => {
    const appointment = await simpleOmneoRequest('POST', '/appointments', {
      appointment_definition_id: definitionID,
      profile_id: profileID,
      location_id: locationID,
      scheduled_start_at: `${futureDate(3)} 10:00:00`,
      scheduled_end_at: `${futureDate(3)} 10:30:00`,
      timezone: 'Australia/Melbourne'
    }).then(({ data }) => data)
    CREATED_APPOINTMENT_IDS.push(appointment.id)

    const waitlistEntry: AppointmentWaitlist = await omneoClient.appointmentWaitlists.update(waitlistEntryID, {
      status: 'fulfilled',
      appointment_id: appointment.id
    }).catch((err) => {
      console.error('SDK Update Appointment Waitlist failed:', err)
      throw new Error('SDK Update Appointment Waitlist failed')
    })

    expect(waitlistEntry).toBeDefined()
    expect(waitlistEntry.status).toBe('fulfilled')
    expect(waitlistEntry.appointment_id).toBe(appointment.id)
  })

  test('SDK Delete Appointment Waitlist', async () => {
    await omneoClient.appointmentWaitlists.delete(waitlistEntryID).catch((err) => {
      console.error('SDK Delete Appointment Waitlist failed:', err)
      throw new Error('SDK Delete Appointment Waitlist failed')
    })

    const response = await simpleOmneoRequest('GET', `/appointment-waitlists/${waitlistEntryID}`)
    expect(response.status).toBe(404)
    CREATED_APPOINTMENT_WAITLIST_IDS.length = 0
  })
})

afterAll(async () => {
  for (const id of CREATED_APPOINTMENT_WAITLIST_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/appointment-waitlists/${id}`)
    if (response.status === 204) {
      console.log(`SDK Appointment Waitlist ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Appointment Waitlist ID ${id}`, response)
    }
  }
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
