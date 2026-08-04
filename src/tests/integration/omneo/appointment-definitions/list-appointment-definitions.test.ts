import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentDefinitionResponse } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []

describe('List Appointment Definitions', () => {
  test('SDK List Appointment Definitions', async () => {
    const payload = {
      handle: getRandomString('sdk_unit_test_list_appointment_definitions_handle'),
      name: getRandomString('sdk_unit_test_list_appointment_definitions_name'),
      duration_minutes: 30,
      booking_type: 'instant',
      normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
      ]
    }
    const seeded = await seedAppointmentDefinition(payload).then(({ data }) => data)
    CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)

    const response: AppointmentDefinitionResponse = await omneoClient.appointmentDefinitions.list({
      'filter[handle]': payload.handle
    }).catch((err) => {
      console.error('SDK List Appointment Definitions failed:', err)
      throw new Error('SDK List Appointment Definitions failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBe(1)
    expect(response.data[0].id).toBe(seeded.id)
    expect(response.data[0].handle).toBe(payload.handle)
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
