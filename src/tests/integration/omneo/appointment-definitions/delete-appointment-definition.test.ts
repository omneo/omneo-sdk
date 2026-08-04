import { describe, expect, test } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Delete Appointment Definition', () => {
  test('SDK Delete Appointment Definition', async () => {
    const seeded = await seedAppointmentDefinition({
      handle: getRandomString('sdk_unit_test_delete_appointment_definition_handle'),
      name: getRandomString('sdk_unit_test_delete_appointment_definition_name'),
      duration_minutes: 30,
      booking_type: 'instant',
      normal_hours: [
        { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
      ]
    }).then(({ data }) => data)

    await omneoClient.appointmentDefinitions.delete(seeded.id).catch((err) => {
      console.error('SDK Delete Appointment Definition failed:', err)
      throw new Error('SDK Delete Appointment Definition failed')
    })

    const response = await simpleOmneoRequest('GET', `/appointment-definitions/${seeded.id}`)
    expect(response.status).toBe(404)
  })
})
