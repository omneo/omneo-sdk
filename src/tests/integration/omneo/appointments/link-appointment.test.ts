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
let appointmentID: number
let linkedProfileID: string
let secondLinkedProfileID: string

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  // Seeded in parallel — six serial round trips push this hook past the hook
  // timeout when the full suite is running
  const [locations, profile, secondProfile, thirdProfile] = await Promise.all([
    simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data),
    simpleOmneoRequest('POST', '/profiles', {
      first_name: 'SDK',
      last_name: 'Appointment Test',
      email: `${getRandomString('sdk_unit_test_link_appointment')}@omneodemo.com`
    }).then(({ data }) => data),
    simpleOmneoRequest('POST', '/profiles', {
      first_name: 'SDK',
      last_name: 'Linked Attendee',
      email: `${getRandomString('sdk_unit_test_link_appointment_attendee')}@omneodemo.com`
    }).then(({ data }) => data),
    simpleOmneoRequest('POST', '/profiles', {
      first_name: 'SDK',
      last_name: 'Second Attendee',
      email: `${getRandomString('sdk_unit_test_link_appointment_attendee_two')}@omneodemo.com`
    }).then(({ data }) => data)
  ])
  CREATED_PROFILE_IDS.push(profile.id)
  linkedProfileID = secondProfile.id
  CREATED_PROFILE_IDS.push(secondProfile.id)
  secondLinkedProfileID = thirdProfile.id
  CREATED_PROFILE_IDS.push(thirdProfile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_link_appointment_handle'),
    name: getRandomString('sdk_unit_test_link_appointment_name'),
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
  CREATED_APPOINTMENT_IDS.push(appointment.id)
})

describe('Link Appointment', () => {
  test('SDK Link Appointment to a profile', async () => {
    const appointment: Appointment = await omneoClient.appointments.link(appointmentID, {
      type: 'profile',
      id: linkedProfileID
    }).catch((err) => {
      console.error('SDK Link Appointment failed:', err)
      throw new Error('SDK Link Appointment failed')
    })

    expect(appointment).toBeDefined()
    expect(Array.isArray(appointment.links)).toBe(true)
    expect(appointment.links?.find((link) => link.type === 'profile' && link.target_id === linkedProfileID)).toBeDefined()
  })

  test('SDK Link Appointment is idempotent', async () => {
    const appointment: Appointment = await omneoClient.appointments.link(appointmentID, {
      type: 'profile',
      id: linkedProfileID
    }).catch((err) => {
      console.error('SDK Link Appointment (repeat) failed:', err)
      throw new Error('SDK Link Appointment (repeat) failed')
    })

    const matchingLinks = appointment.links?.filter((link) => link.type === 'profile' && link.target_id === linkedProfileID)
    expect(matchingLinks?.length).toBe(1)
  })

  test('SDK Unlink Appointment', async () => {
    await omneoClient.appointments.unlink(appointmentID, {
      type: 'profile',
      id: linkedProfileID
    }).catch((err) => {
      console.error('SDK Unlink Appointment failed:', err)
      throw new Error('SDK Unlink Appointment failed')
    })

    // Reads never include links, so verify the removal through a follow-up
    // link response, which returns the full current links array
    const appointment: Appointment = await omneoClient.appointments.link(appointmentID, {
      type: 'profile',
      id: secondLinkedProfileID
    }).catch((err) => {
      console.error('SDK Link Appointment (verify unlink) failed:', err)
      throw new Error('SDK Link Appointment (verify unlink) failed')
    })

    expect(appointment.links?.find((link) => link.type === 'profile' && link.target_id === linkedProfileID)).toBeUndefined()
    expect(appointment.links?.find((link) => link.type === 'profile' && link.target_id === secondLinkedProfileID)).toBeDefined()
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
