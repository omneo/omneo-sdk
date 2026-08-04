import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let profileID: string
let visibleDefinitionID: number
let hiddenDefinitionID: number

beforeAll(async () => {
  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Visibility Test',
    email: `${getRandomString('sdk_unit_test_visible_definitions')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  // Always-true visibility condition, so every profile passes the check
  const visibleDefinition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_visible_definition_handle'),
    name: getRandomString('sdk_unit_test_visible_definition_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    is_published: true,
    visibility_condition: { '==': [1, 1] }
  }).then(({ data }) => data)
  visibleDefinitionID = visibleDefinition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(visibleDefinition.id)

  // A null visibility_condition never passes the visibility check
  const hiddenDefinition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_hidden_definition_handle'),
    name: getRandomString('sdk_unit_test_hidden_definition_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    is_published: true
  }).then(({ data }) => data)
  hiddenDefinitionID = hiddenDefinition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(hiddenDefinition.id)
})

describe('List Visible Appointment Definitions', () => {
  test('SDK List Visible Appointment Definitions for a profile', async () => {
    const response = await omneoClient.profiles.appointments.listVisibleDefinitions(profileID).catch((err) => {
      console.error('SDK List Visible Appointment Definitions failed:', err)
      throw new Error('SDK List Visible Appointment Definitions failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((definition) => definition.id === visibleDefinitionID)).toBeDefined()
    expect(response.data.find((definition) => definition.id === hiddenDefinitionID)).toBeUndefined()
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
