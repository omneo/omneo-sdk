import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'

const CREATED_TRIGGER_IDS : number[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Triggers create', () => {
  test('SDK can create a trigger', async () => {
    const payload = {
      name: 'SDK Unit Test Create Trigger',
      trigger: 'profile.created'
    }

    const trigger = await omneo.triggers.create(payload)
    console.log(trigger)
    CREATED_TRIGGER_IDS.push(trigger.id)

    expect(trigger.name).toEqual(payload.name)
    expect(trigger.trigger).toEqual(payload.trigger)
  })
})

afterAll(async () => {
  if (CREATED_TRIGGER_IDS.length > 0) {
    for (const triggerId of CREATED_TRIGGER_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/triggers/${triggerId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Trigger ID ${triggerId} deleted`)
      } else {
        console.log(`Failed to delete Trigger ID ${triggerId}`, deleteResponse)
      }
    }
  }
})
