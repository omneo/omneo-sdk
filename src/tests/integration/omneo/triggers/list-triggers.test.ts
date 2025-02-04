import { describe, expect, test, afterAll } from 'vitest'
import { RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'

const CREATED_TRIGGER_IDS : number[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Triggers list', () => {
  test('SDK can list triggers.', async () => {
    const sdkTriggerList = await omneo.triggers.list()
    expect(Array.isArray(sdkTriggerList.data)).toBe(true)
  })

  test('SDK can get triggers with filters', async () => {
    const payload = {
      name: 'SDK Unit Test List Trigger with filters',
      trigger: 'profile.created'
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/triggers', payload)
    CREATED_TRIGGER_IDS.push(createdData.id)

    const params: RequestParams = {
      'filter[name]': payload.name
    }

    const triggers = await omneo.triggers.list(params)
    expect(triggers.data.length).toBeGreaterThan(0)

    const arrayIsFiltered = triggers.data.every((target) => target.name === payload.name)
    const sdkTarget = triggers.data[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkTarget).toEqual(expect.objectContaining({
      id: createdData.id,
      name: payload.name
    }))
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
