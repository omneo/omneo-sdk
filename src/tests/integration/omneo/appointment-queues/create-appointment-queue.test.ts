import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentQueue, CreateAppointmentQueueInput } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_QUEUE_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
const CREATED_PROFILE_IDS: string[] = []
let definitionID: number
let locationID: number
let profileID: string

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)
  locationID = locations[0].id

  const profile = await simpleOmneoRequest('POST', '/profiles', {
    first_name: 'SDK',
    last_name: 'Queue Test',
    email: `${getRandomString('sdk_unit_test_create_queue')}@omneodemo.com`
  }).then(({ data }) => data)
  profileID = profile.id
  CREATED_PROFILE_IDS.push(profile.id)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_create_queue_handle'),
    name: getRandomString('sdk_unit_test_create_queue_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    allow_walk_in: true,
    allow_queue: true,
    is_published: true,
    location_ids: [locationID]
  }).then(({ data }) => data)
  definitionID = definition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)
})

describe('Create Appointment Queue', () => {
  test('SDK Create Appointment Queue with a profile', async () => {
    const payload: CreateAppointmentQueueInput = {
      appointment_definition_id: definitionID,
      location_id: locationID,
      profile_id: profileID,
      notes: 'SDK unit test walk-in'
    }

    const queueEntry: AppointmentQueue = await omneoClient.appointmentQueues.create(payload).catch((err) => {
      console.error('SDK Create Appointment Queue failed:', err)
      throw new Error('SDK Create Appointment Queue failed')
    })
    CREATED_APPOINTMENT_QUEUE_IDS.push(queueEntry.id)

    expect(queueEntry).toBeDefined()
    expect(queueEntry.appointment_definition_id).toBe(definitionID)
    expect(queueEntry.location_id).toBe(locationID)
    expect(queueEntry.profile_id).toBe(profileID)
    expect(queueEntry.status).toBe('waiting')
    expect(queueEntry.appointment_id).toBeNull()
    expect(queueEntry.notes).toBe(payload.notes)
  })

  test('SDK Create Appointment Queue anonymous walk-in', async () => {
    const payload: CreateAppointmentQueueInput = {
      appointment_definition_id: definitionID,
      location_id: locationID
    }

    const queueEntry: AppointmentQueue = await omneoClient.appointmentQueues.create(payload).catch((err) => {
      console.error('SDK Create Appointment Queue (anonymous) failed:', err)
      throw new Error('SDK Create Appointment Queue (anonymous) failed')
    })
    CREATED_APPOINTMENT_QUEUE_IDS.push(queueEntry.id)

    expect(queueEntry).toBeDefined()
    expect(queueEntry.profile_id).toBeNull()
    expect(queueEntry.profile).toBeNull()
    expect(queueEntry.status).toBe('waiting')
  })
})

afterAll(async () => {
  for (const id of CREATED_APPOINTMENT_QUEUE_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/appointment-queues/${id}`)
    if (response.status === 204) {
      console.log(`SDK Appointment Queue ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Appointment Queue ID ${id}`, response)
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
