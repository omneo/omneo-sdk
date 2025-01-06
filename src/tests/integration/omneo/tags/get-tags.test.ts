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

describe('Systems get', () => {
  test('SDK can get a system', async () => {
    const payload = {
      handle: getHandle()
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/systems', payload)
    CREATED_SYSTEM_IDS.push(createdData.id)

    const system = await omneo.systems.get(createdData.id)
    expect(system.id).toEqual(createdData.id)
  })
})

afterAll(async () => {
  if (CREATED_SYSTEM_IDS.length > 0) {
    for (const systemId of CREATED_SYSTEM_IDS) {
      console.log('Cleaning up SDK System with ID', systemId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/systems/${systemId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK System ID ${systemId} deleted`)
      } else {
        console.log(`Failed to delete System ID ${systemId}`, deleteResponse)
      }
    }
  }
})
