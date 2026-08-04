import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentWaitlist, CreateAppointmentWaitlistInput } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_WAITLIST_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let locationID: number
let profileID: string

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  locationID = locations[0].id

  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Waitlist Test',
    email: `${getRandomString('sdk_unit_test_create_waitlist')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_create_waitlist_handle'),
    name: getRandomString('sdk_unit_test_create_waitlist_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    allow_waitlist: true,
    is_published: true,
    location_ids: [locationID]
  }).then(({ data }) => data)
  definitionID = definition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)
})

describe('Create Appointment Waitlist', () => {
  test('SDK Create Appointment Waitlist', async () => {
    const payload: CreateAppointmentWaitlistInput = {
      appointment_definition_id: definitionID,
      profile_id: profileID,
      location_id: locationID,
      notes: 'SDK unit test waitlist entry'
    }

    const waitlistEntry: AppointmentWaitlist = await omneoClient.appointmentWaitlists.create(payload).catch((err) => {
      console.error('SDK Create Appointment Waitlist failed:', err)
      throw new Error('SDK Create Appointment Waitlist failed')
    })
    CREATED_APPOINTMENT_WAITLIST_IDS.push(waitlistEntry.id)

    expect(waitlistEntry).toBeDefined()
    expect(waitlistEntry.appointment_definition_id).toBe(definitionID)
    expect(waitlistEntry.profile_id).toBe(profileID)
    expect(waitlistEntry.location_id).toBe(locationID)
    expect(waitlistEntry.status).toBe('active')
    expect(waitlistEntry.appointment_id).toBeNull()
    expect(waitlistEntry.notes).toBe(payload.notes)
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
