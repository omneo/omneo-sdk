import { describe, expect, test, afterAll } from 'vitest'
import { RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_SYSTEM_IDS : number[] = []
const getHandle = () => `sdk_unit_test_system_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Systems list', () => {
  test('SDK can list systems.', async () => {
    const sdkSystemList = await omneo.systems.list()
    expect(Array.isArray(sdkSystemList)).toBe(true)
  })

  test('SDK can get systems with filters', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test System List',
      handle: testHandle
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/systems', payload)
    CREATED_SYSTEM_IDS.push(createdData.id)

    const params?: RequestParams = {
      'filter[handle]': payload.handle
    }

    const systems = await omneo.systems.list(params)
    expect(systems.length).toBeGreaterThan(0)

    const arrayIsFiltered = systems.every((target) => target.handle === payload.handle)
    const sdkTarget = systems[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkTarget).toEqual(expect.objectContaining({
      id: createdData.id,
      handle: payload.handle
    }))
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
