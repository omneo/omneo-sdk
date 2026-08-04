import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { ID } from '@id'
import { simpleOmneoRequest, simpleIDRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const CREATED_APPOINTMENT_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []

const futureDate = (daysAhead: number): string => {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
}

// Skipped: the ID API routes /profiles/me/appointments and
// /profiles/me/appointment-definitions/visibility exist, but currently
// return 403 "Invalid scope(s) provided." for profile tokens minted via
// /auth/token (verified 2026-08-04). Unskip once the platform enables the
// appointment scopes on ID tokens.
describe.skip('ID appointments', () => {
  let locationID: number
  let profile: any
  let definition: any
  let seededAppointment: any
  let IDClient: ID

  beforeAll(async () => {
    const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
    locationID = locations[0].id

    profile = await simpleOmneoRequest('POST', '/profiles', {
      first_name: 'SDK',
      last_name: 'ID Appointment Test',
      email: `${getRandomString('sdk_unit_test_id_appointments')}@omneodemo.com`
    }).then(({ data }) => data)
    CREATED_PROFILE_IDS.push(profile.id)

    definition = await seedAppointmentDefinition({
      handle: getRandomString('sdk_unit_test_id_appointments_handle'),
      name: getRandomString('sdk_unit_test_id_appointments_name'),
      duration_minutes: 30,
      booking_type: 'instant',
      normal_hours: DEFINITION_ALL_WEEK_HOURS,
      min_lead_minutes: 0,
      allow_customer_booking: true,
      is_published: true,
      location_ids: [locationID],
      visibility_condition: { '==': [1, 1] }
    }).then(({ data }) => data)
    CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

    seededAppointment = await simpleOmneoRequest('POST', '/appointments', {
      appointment_definition_id: definition.id,
      profile_id: profile.id,
      location_id: locationID,
      scheduled_start_at: `${futureDate(3)} 10:00:00`,
      scheduled_end_at: `${futureDate(3)} 10:30:00`,
      timezone: 'Australia/Melbourne'
    }).then(({ data }) => data)
    CREATED_APPOINTMENT_IDS.push(seededAppointment.id)

    const tokenData = await simpleIDRequest('POST', 'auth/token', process.env.OMNEO_TOKEN, { id: profile.id })
      .then(({ data }) => data)

    IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      omneoAPIToken: process.env.OMNEO_TOKEN as string,
      IDToken: tokenData.token,
      IDTokenExpiry: tokenData.exp
    })
  })

  test('ID SDK can list the profile appointments', async () => {
    const response = await IDClient.profile.appointments.list().catch((err) => {
      console.error('ID SDK List Appointments failed:', err)
      throw new Error('ID SDK List Appointments failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((appointment) => appointment.id === seededAppointment.id)).toBeDefined()
  })

  test('ID SDK can get an appointment', async () => {
    const appointment = await IDClient.profile.appointments.get(seededAppointment.id).catch((err) => {
      console.error('ID SDK Get Appointment failed:', err)
      throw new Error('ID SDK Get Appointment failed')
    })

    expect(appointment).toBeDefined()
    expect(appointment.id).toBe(seededAppointment.id)
    expect(appointment.profile_id).toBe(profile.id)
  })

  test('ID SDK can create an appointment', async () => {
    const appointment = await IDClient.profile.appointments.create({
      appointment_definition_id: definition.id,
      location_id: locationID,
      scheduled_start_at: `${futureDate(4)} 11:00:00`,
      scheduled_end_at: `${futureDate(4)} 11:30:00`,
      timezone: 'Australia/Melbourne'
    }).catch((err) => {
      console.error('ID SDK Create Appointment failed:', err)
      throw new Error('ID SDK Create Appointment failed')
    })
    CREATED_APPOINTMENT_IDS.push(appointment.id)

    expect(appointment).toBeDefined()
    expect(appointment.profile_id).toBe(profile.id)
    expect(appointment.appointment_definition_id).toBe(definition.id)
  })

  test('ID SDK can update an appointment', async () => {
    const appointment = await IDClient.profile.appointments.update(seededAppointment.id, {
      status: 'cancelled'
    }).catch((err) => {
      console.error('ID SDK Update Appointment failed:', err)
      throw new Error('ID SDK Update Appointment failed')
    })

    expect(appointment).toBeDefined()
    expect(appointment.status).toBe('cancelled')
    expect(appointment.cancelled_at).not.toBeNull()
  })

  test('ID SDK can list visible appointment definitions', async () => {
    const response = await IDClient.profile.appointments.listVisibleDefinitions().catch((err) => {
      console.error('ID SDK List Visible Appointment Definitions failed:', err)
      throw new Error('ID SDK List Visible Appointment Definitions failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((item) => item.id === definition.id)).toBeDefined()
  })

  test('ID SDK can delete an appointment', async () => {
    await IDClient.profile.appointments.delete(seededAppointment.id).catch((err) => {
      console.error('ID SDK Delete Appointment failed:', err)
      throw new Error('ID SDK Delete Appointment failed')
    })

    const response = await simpleOmneoRequest('GET', `/appointments/${seededAppointment.id}`)
    expect(response.status).toBe(404)
    CREATED_APPOINTMENT_IDS.splice(CREATED_APPOINTMENT_IDS.indexOf(seededAppointment.id), 1)
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
