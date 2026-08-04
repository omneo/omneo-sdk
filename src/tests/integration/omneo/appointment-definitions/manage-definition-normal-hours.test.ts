import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentDefinitionNormalHour } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
let definitionID: number

beforeAll(async () => {
  const seeded = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_definition_normal_hours_handle'),
    name: getRandomString('sdk_unit_test_definition_normal_hours_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: [
      { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
    ]
  }).then(({ data }) => data)
  definitionID = seeded.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)
})

describe('Manage Appointment Definition Normal Hours', () => {
  let normalHour: AppointmentDefinitionNormalHour

  test('SDK Create Appointment Definition Normal Hour', async () => {
    const payload = {
      day_of_week: 'WED' as const,
      available_from: '09:00',
      available_until: '17:00'
    }

    normalHour = await omneoClient.appointmentDefinitions.normalHours.create(definitionID, payload).catch((err) => {
      console.error('SDK Create Appointment Definition Normal Hour failed:', err)
      throw new Error('SDK Create Appointment Definition Normal Hour failed')
    })

    expect(normalHour).toBeDefined()
    expect(normalHour.day_of_week).toBe(payload.day_of_week)
    expect(normalHour.appointment_definition_id).toBe(definitionID)
  })

  test('SDK List Appointment Definition Normal Hours', async () => {
    const normalHours = await omneoClient.appointmentDefinitions.normalHours.list(definitionID).catch((err) => {
      console.error('SDK List Appointment Definition Normal Hours failed:', err)
      throw new Error('SDK List Appointment Definition Normal Hours failed')
    })

    expect(Array.isArray(normalHours)).toBe(true)
    expect(normalHours.find((hour) => hour.id === normalHour.id)).toBeDefined()
  })

  test('SDK Get Appointment Definition Normal Hour', async () => {
    const found = await omneoClient.appointmentDefinitions.normalHours.get(definitionID, normalHour.id).catch((err) => {
      console.error('SDK Get Appointment Definition Normal Hour failed:', err)
      throw new Error('SDK Get Appointment Definition Normal Hour failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(normalHour.id)
    expect(found.day_of_week).toBe(normalHour.day_of_week)
  })

  test('SDK Update Appointment Definition Normal Hour', async () => {
    const updated = await omneoClient.appointmentDefinitions.normalHours.update(definitionID, normalHour.id, {
      available_until: '18:00'
    }).catch((err) => {
      console.error('SDK Update Appointment Definition Normal Hour failed:', err)
      throw new Error('SDK Update Appointment Definition Normal Hour failed')
    })

    expect(updated).toBeDefined()
    expect(updated.id).toBe(normalHour.id)
    expect(updated.available_until).toContain('18:00')
  })

  test('SDK Delete Appointment Definition Normal Hour', async () => {
    await omneoClient.appointmentDefinitions.normalHours.delete(definitionID, normalHour.id).catch((err) => {
      console.error('SDK Delete Appointment Definition Normal Hour failed:', err)
      throw new Error('SDK Delete Appointment Definition Normal Hour failed')
    })

    const normalHours = await omneoClient.appointmentDefinitions.normalHours.list(definitionID)
    expect(normalHours.find((hour) => hour.id === normalHour.id)).toBeUndefined()
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
