import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'

const FAILED_DELETED_TRIGGER_IDS : number[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Triggers delete', () => {
  test('SDK can delete a trigger', async () => {
    const payload = {
      name: 'SDK Unit Test Delete Trigger',
      trigger: 'profile.created'
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/triggers', payload)
    await omneo.triggers.delete(createdData.id).catch(() => {
      FAILED_DELETED_TRIGGER_IDS.push(createdData.id)
    })
    const deleteResponse = await simpleOmneoRequest('GET', `/triggers/${createdData.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETED_TRIGGER_IDS.find((t) => t === createdData.id)) {
      FAILED_DELETED_TRIGGER_IDS.push(createdData.id)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_TRIGGER_IDS.length > 0) {
    for (const triggerId of FAILED_DELETED_TRIGGER_IDS) {
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
