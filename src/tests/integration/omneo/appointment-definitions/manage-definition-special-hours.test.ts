import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentDefinitionSpecialHour } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
let definitionID: number

beforeAll(async () => {
  const seeded = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_definition_special_hours_handle'),
    name: getRandomString('sdk_unit_test_definition_special_hours_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: [
      { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
    ]
  }).then(({ data }) => data)
  definitionID = seeded.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)
})

describe('Manage Appointment Definition Special Hours', () => {
  let specialHour: AppointmentDefinitionSpecialHour

  test('SDK Create Appointment Definition Special Hour', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_special_hour_name'),
      start_at: '2026-12-25',
      end_at: '2026-12-25',
      is_repeating: false,
      available_from: '10:00',
      available_until: '14:00'
    }

    specialHour = await omneoClient.appointmentDefinitions.specialHours.create(definitionID, payload).catch((err) => {
      console.error('SDK Create Appointment Definition Special Hour failed:', err)
      throw new Error('SDK Create Appointment Definition Special Hour failed')
    })

    expect(specialHour).toBeDefined()
    expect(specialHour.name).toBe(payload.name)
    expect(specialHour.is_repeating).toBe(payload.is_repeating)
    expect(specialHour.appointment_definition_id).toBe(definitionID)
  })

  test('SDK List Appointment Definition Special Hours', async () => {
    const specialHours = await omneoClient.appointmentDefinitions.specialHours.list(definitionID).catch((err) => {
      console.error('SDK List Appointment Definition Special Hours failed:', err)
      throw new Error('SDK List Appointment Definition Special Hours failed')
    })

    expect(Array.isArray(specialHours)).toBe(true)
    expect(specialHours.find((hour) => hour.id === specialHour.id)).toBeDefined()
  })

  test('SDK Get Appointment Definition Special Hour', async () => {
    const found = await omneoClient.appointmentDefinitions.specialHours.get(definitionID, specialHour.id).catch((err) => {
      console.error('SDK Get Appointment Definition Special Hour failed:', err)
      throw new Error('SDK Get Appointment Definition Special Hour failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(specialHour.id)
    expect(found.name).toBe(specialHour.name)
  })

  test('SDK Update Appointment Definition Special Hour', async () => {
    const updated = await omneoClient.appointmentDefinitions.specialHours.update(definitionID, specialHour.id, {
      available_until: '15:00'
    }).catch((err) => {
      console.error('SDK Update Appointment Definition Special Hour failed:', err)
      throw new Error('SDK Update Appointment Definition Special Hour failed')
    })

    expect(updated).toBeDefined()
    expect(updated.id).toBe(specialHour.id)
    expect(updated.available_until).toContain('15:00')
  })

  test('SDK Delete Appointment Definition Special Hour', async () => {
    await omneoClient.appointmentDefinitions.specialHours.delete(definitionID, specialHour.id).catch((err) => {
      console.error('SDK Delete Appointment Definition Special Hour failed:', err)
      throw new Error('SDK Delete Appointment Definition Special Hour failed')
    })

    const specialHours = await omneoClient.appointmentDefinitions.specialHours.list(definitionID)
    expect(specialHours.find((hour) => hour.id === specialHour.id)).toBeUndefined()
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
