import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { AppointmentQueue, AppointmentQueueResponse } from '@types'
import { simpleOmneoRequest, getRandomString, seedAppointmentDefinition, DEFINITION_ALL_WEEK_HOURS } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_APPOINTMENT_QUEUE_IDS: number[] = []
const CREATED_APPOINTMENT_DEFINITION_IDS: number[] = []
let definitionID: number
let queueEntryID: number

beforeAll(async () => {
  const locations = await simpleOmneoRequest('GET', '/locations?page[size]=1').then(({ data }) => data)

  const definition = await seedAppointmentDefinition({
    handle: getRandomString('sdk_unit_test_manage_queue_handle'),
    name: getRandomString('sdk_unit_test_manage_queue_name'),
    duration_minutes: 30,
    booking_type: 'instant',
    normal_hours: DEFINITION_ALL_WEEK_HOURS,
    allow_walk_in: true,
    allow_queue: true,
    is_published: true,
    location_ids: [locations[0].id]
  }).then(({ data }) => data)
  definitionID = definition.id
  CREATED_APPOINTMENT_DEFINITION_IDS.push(definition.id)

  const queueEntry = await simpleOmneoRequest('POST', '/appointment-queues', {
    appointment_definition_id: definitionID,
    location_id: locations[0].id
  }).then(({ data }) => data)
  queueEntryID = queueEntry.id
  CREATED_APPOINTMENT_QUEUE_IDS.push(queueEntry.id)
})

describe('Manage Appointment Queue', () => {
  test('SDK Get Appointment Queue', async () => {
    const queueEntry: AppointmentQueue = await omneoClient.appointmentQueues.get(queueEntryID).catch((err) => {
      console.error('SDK Get Appointment Queue failed:', err)
      throw new Error('SDK Get Appointment Queue failed')
    })

    expect(queueEntry).toBeDefined()
    expect(queueEntry.id).toBe(queueEntryID)
    expect(queueEntry.appointment_definition_id).toBe(definitionID)
    expect(queueEntry.status).toBe('waiting')
  })

  test('SDK List Appointment Queues', async () => {
    const response: AppointmentQueueResponse = await omneoClient.appointmentQueues.list({
      'filter[appointment_definition_id]': definitionID
    }).catch((err) => {
      console.error('SDK List Appointment Queues failed:', err)
      throw new Error('SDK List Appointment Queues failed')
    })

    expect(response).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.find((entry) => entry.id === queueEntryID)).toBeDefined()
  })

  test('SDK Update Appointment Queue through its lifecycle', async () => {
    const called: AppointmentQueue = await omneoClient.appointmentQueues.update(queueEntryID, {
      status: 'called'
    }).catch((err) => {
      console.error('SDK Update Appointment Queue (called) failed:', err)
      throw new Error('SDK Update Appointment Queue (called) failed')
    })
    expect(called.status).toBe('called')

    const served: AppointmentQueue = await omneoClient.appointmentQueues.update(queueEntryID, {
      status: 'served'
    }).catch((err) => {
      console.error('SDK Update Appointment Queue (served) failed:', err)
      throw new Error('SDK Update Appointment Queue (served) failed')
    })
    expect(served.status).toBe('served')
  })

  test('SDK Delete Appointment Queue', async () => {
    await omneoClient.appointmentQueues.delete(queueEntryID).catch((err) => {
      console.error('SDK Delete Appointment Queue failed:', err)
      throw new Error('SDK Delete Appointment Queue failed')
    })

    const response = await simpleOmneoRequest('GET', `/appointment-queues/${queueEntryID}`)
    expect(response.status).toBe(404)
    CREATED_APPOINTMENT_QUEUE_IDS.length = 0
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
})
