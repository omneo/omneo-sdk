import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let staffProfileID: string

beforeAll(async () => {
  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Staff Test',
    email: `${getRandomString('sdk_unit_test_definition_staff')}@omneodemo.com`
  }).then(({ data }) => data)
  staffProfileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  // staff_ids must be non-empty when use_staff_from_location is false and
  // requires_staff is true, so seed the definition with a different profile
  // and let the tests attach staffProfileID through the SDK
  const seedStaffProfile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Seed Staff',
    email: `${getRandomString('sdk_unit_test_definition_seed_staff')}@omneodemo.com`
  }).then(({ data }) => data)
  CREATED_PROFILE_IDS.push(seedStaffProfile.id)

  const seeded = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_definition_staff_handle'),
    name: getRandomString('sdk_unit_test_definition_staff_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    requires_staff: true,
    use_staff_from_location: false,
    staff_ids: [seedStaffProfile.id],
    normal_hours: [
      { day_of_week: 'MON', available_from: '09:00', available_until: '17:00' }
    ]
  }).then(({ data }) => data)
  definitionID = seeded.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(seeded.id)
})

describe('Manage Appointment Definition Staff', () => {
  let staffRowID: number

  test('SDK Create Appointment Definition Staff', async () => {
    const staffRow = await omneoClient.appointmentDefinitions.staff.create(definitionID, {
      staff_id: staffProfileID,
      is_active: true
    }).catch((err) => {
      console.error('SDK Create Appointment Definition Staff failed:', err)
      throw new Error('SDK Create Appointment Definition Staff failed')
    })
    staffRowID = staffRow.id

    expect(staffRow).toBeDefined()
    expect(staffRow.staff_id).toBe(staffProfileID)
    expect(staffRow.is_active).toBe(true)
    expect(staffRow.appointment_definition_id).toBe(definitionID)
  })

  test('SDK List Appointment Definition Staff', async () => {
    const staffRows = await omneoClient.appointmentDefinitions.staff.list(definitionID).catch((err) => {
      console.error('SDK List Appointment Definition Staff failed:', err)
      throw new Error('SDK List Appointment Definition Staff failed')
    })

    expect(Array.isArray(staffRows)).toBe(true)
    expect(staffRows.find((row) => row.id === staffRowID)).toBeDefined()
  })

  test('SDK Get Appointment Definition Staff', async () => {
    const found = await omneoClient.appointmentDefinitions.staff.get(definitionID, staffRowID).catch((err) => {
      console.error('SDK Get Appointment Definition Staff failed:', err)
      throw new Error('SDK Get Appointment Definition Staff failed')
    })

    expect(found).toBeDefined()
    expect(found.id).toBe(staffRowID)
    expect(found.staff_id).toBe(staffProfileID)
  })

  test('SDK Update Appointment Definition Staff', async () => {
    const updated = await omneoClient.appointmentDefinitions.staff.update(definitionID, staffRowID, {
      is_active: false
    }).catch((err) => {
      console.error('SDK Update Appointment Definition Staff failed:', err)
      throw new Error('SDK Update Appointment Definition Staff failed')
    })

    expect(updated).toBeDefined()
    expect(updated.id).toBe(staffRowID)
    expect(updated.is_active).toBe(false)
  })

  test('SDK Delete Appointment Definition Staff', async () => {
    await omneoClient.appointmentDefinitions.staff.delete(definitionID, staffRowID).catch((err) => {
      console.error('SDK Delete Appointment Definition Staff failed:', err)
      throw new Error('SDK Delete Appointment Definition Staff failed')
    })

    const staffRows = await omneoClient.appointmentDefinitions.staff.list(definitionID)
    expect(staffRows.find((row) => row.id === staffRowID)).toBeUndefined()
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
  for (const id of CREATED_PROFILE_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/profiles/${id}`)
    if (response.status === 204 || response.data) {
      console.log(`SDK Profile ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Profile ID ${id}`, response)
    }
  }
})
