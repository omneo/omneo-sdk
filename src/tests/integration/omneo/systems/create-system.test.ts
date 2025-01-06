import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_SYSTEM_IDS : number[] = []
const getHandle = () => `sdk_unit_test_system_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Systems create', () => {
  test('SDK can create a system', async () => {
    const payload = {
      handle: getHandle()
    }

    const system = await omneo.systems.create(payload)
    CREATED_SYSTEM_IDS.push(system.id)

    expect(system).toHaveProperty('handle', payload.handle)
  })
})

afterAll(async () => {
  if (CREATED_SYSTEM_IDS.length > 0) {
    for (const systemId of CREATED_SYSTEM_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/systems/${systemId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK System ID ${systemId} deleted`)
      } else {
        console.log(`Failed to delete System ID ${systemId}`, deleteResponse)
      }
    }
  }
})
