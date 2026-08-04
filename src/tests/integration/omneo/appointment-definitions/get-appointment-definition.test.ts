import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentDefinition } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []

describe('Get Appointment Definition', () => {
  test('SDK Get Appointment Definition', async () => {
    const payload = {
      handle: getRandomString('sdk_unit_test_get_appointment_definition_handle'),
      name: getRandomString('sdk_unit_test_get_appointment_definition_name'),
      duration_minutes: 30,
      booking_type: 'instant',
      normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
      ]
    }
    const seeded = await seedAppointmentDefinition(payload).then(({ data }) => data)
    CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)

    const definition: AppointmentDefinition = await omneoClient.appointmentDefinitions.get(seeded.id).catch((err) => {
      console.error('SDK Get Appointment Definition failed:', err)
      throw new Error('SDK Get Appointment Definition failed')
    })

    expect(definition).toBeDefined()
    expect(definition.id).toBe(seeded.id)
    expect(definition.handle).toBe(payload.handle)
    expect(definition.name).toBe(payload.name)
    expect(definition.duration_minutes).toBe(payload.duration_minutes)
    expect(definition.booking_type).toBe(payload.booking_type)
    expect(definition).toHaveProperty('has_booking_questionnaire')
    expect(definition).toHaveProperty('normal_hours')
    expect(definition).toHaveProperty('locations')
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
})
