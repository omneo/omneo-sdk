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

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Appointment Test',
    email: `${getRandomString('sdk_unit_test_update_appointment')}@omneodemo.com`
  }).then(({ data }) => data)
  CREATED_PROFILE_IDS.push(profile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_update_appointment_handle'),
    name: getRandomString('sdk_unit_test_update_appointment_name'),
    duration_minutes: 30,
    booking_type: 'approval_required',
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

describe('Update Appointment', () => {
  test('SDK Update Appointment status to confirmed stamps confirmed_at', async () => {
    const appointment: Appointment = await omneoClient.appointments.update(appointmentID, {
      status: 'confirmed'
    }).catch((err) => {
      console.error('SDK Update Appointment (confirm) failed:', err)
      throw new Error('SDK Update Appointment (confirm) failed')
    })

    expect(appointment).toBeDefined()
    expect(appointment.id).toBe(appointmentID)
    expect(appointment.status).toBe('confirmed')
    expect(appointment.confirmed_at).not.toBeNull()
  })

  test('SDK Update Appointment reschedule', async () => {
    const appointment: Appointment = await omneoClient.appointments.update(appointmentID, {
      scheduled_start_at: `${futureDate(5)} 14:00:00`,
      scheduled_end_at: `${futureDate(5)} 14:30:00`,
      timezone: 'Australia/Melbourne'
    }).catch((err) => {
      console.error('SDK Update Appointment (reschedule) failed:', err)
      throw new Error('SDK Update Appointment (reschedule) failed')
    })

    expect(appointment).toBeDefined()
    expect(appointment.id).toBe(appointmentID)
    expect(new Date(appointment.scheduled_start_at).getTime()).not.toBeNaN()
  })

  test('SDK Update Appointment status to cancelled stamps cancelled_at', async () => {
    const appointment: Appointment = await omneoClient.appointments.update(appointmentID, {
      status: 'cancelled'
    }).catch((err) => {
      console.error('SDK Update Appointment (cancel) failed:', err)
      throw new Error('SDK Update Appointment (cancel) failed')
    })

    expect(appointment).toBeDefined()
    expect(appointment.status).toBe('cancelled')
    expect(appointment.cancelled_at).not.toBeNull()
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
