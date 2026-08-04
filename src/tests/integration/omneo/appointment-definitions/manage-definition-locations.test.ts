import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentDefinitionLocation } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
let definitionID: number
let locationID: number

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  locationID = locations[0].id

  const seeded = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_definition_locations_handle'),
    name: getRandomString('sdk_unit_test_definition_locations_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: [
      { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
    ]
  }).then(({ data }) => data)
  definitionID = seeded.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)
})

describe('Manage Appointment Definition Locations', () => {
  let definitionLocation: AppointmentDefinitionLocation

  test('SDK Create Appointment Definition Location', async () => {
    definitionLocation = await omneoClient.appointmentDefinitions.locations.create(definitionID, {
      location_id: locationID,
      is_active: true
    }).catch((err) => {
      console.error('SDK Create Appointment Definition Location failed:', err)
      throw new Error('SDK Create Appointment Definition Location failed')
    })

    expect(definitionLocation).toBeDefined()
    expect(definitionLocation.location_id).toBe(locationID)
    expect(definitionLocation.is_active).toBe(true)
    expect(definitionLocation.appointment_definition_id).toBe(definitionID)
  })

  test('SDK List Appointment Definition Locations', async () => {
    const definitionLocations = await omneoClient.appointmentDefinitions.locations.list(definitionID).catch((err) => {
      console.error('SDK List Appointment Definition Locations failed:', err)
      throw new Error('SDK List Appointment Definition Locations failed')
    })

    expect(Array.isArray(definitionLocations)).toBe(true)
    expect(definitionLocations.find((location) => location.id === definitionLocation.id)).toBeDefined()
  })

  // API quirk: get and delete resolve the attachment row id, update resolves
  // the location id
  test('SDK Get Appointment Definition Location', async () => {
    const found = await omneoClient.appointmentDefinitions.locations.get(definitionID, definitionLocation.id).catch((err) => {
      console.error('SDK Get Appointment Definition Location failed:', err)
      throw new Error('SDK Get Appointment Definition Location failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(definitionLocation.id)
    expect(found.location_id).toBe(locationID)
  })

  test('SDK Update Appointment Definition Location', async () => {
    const updated = await omneoClient.appointmentDefinitions.locations.update(definitionID, locationID, {
      is_active: false
    }).catch((err) => {
      console.error('SDK Update Appointment Definition Location failed:', err)
      throw new Error('SDK Update Appointment Definition Location failed')
    })

    expect(updated).toBeDefined()
    expect(updated.location_id).toBe(locationID)
    expect(updated.is_active).toBe(false)
  })

  test('SDK Delete Appointment Definition Location', async () => {
    await omneoClient.appointmentDefinitions.locations.delete(definitionID, definitionLocation.id).catch((err) => {
      console.error('SDK Delete Appointment Definition Location failed:', err)
      throw new Error('SDK Delete Appointment Definition Location failed')
    })

    const definitionLocations = await omneoClient.appointmentDefinitions.locations.list(definitionID)
    expect(definitionLocations.find((location) => location.id === definitionLocation.id)).toBeUndefined()
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
