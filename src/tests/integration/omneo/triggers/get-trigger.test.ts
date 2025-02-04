import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'

const CREATED_TRIGGER_IDS : number[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Triggers get', () => {
  test('SDK can get a trigger', async () => {
    const payload = {
      name: 'SDK Unit Test Get Trigger',
      trigger: 'profile.created'
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/triggers', payload)
    CREATED_TRIGGER_IDS.push(createdData.id)

    const trigger = await omneo.triggers.get(createdData.id)
    expect(trigger.id).toEqual(createdData.id)
  })
})

afterAll(async () => {
  if (CREATED_TRIGGER_IDS.length > 0) {
    for (const triggerId of CREATED_TRIGGER_IDS) {
      console.log('Cleaning up SDK Trigger with ID', triggerId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/triggers/${triggerId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Trigger ID ${triggerId} deleted`)
      } else {
        console.log(`Failed to delete Trigger ID ${triggerId}`, deleteResponse)
      }
    }
  }
})
