import { describe, expect, test, afterAll } from 'vitest'
import { RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_TARGET_IDS : number[] = []
const getHandle = () => `sdk_unit_test_target_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Targets list', () => {
  test('SDK can list targets.', async () => {
    const sdkIdentityList = await omneo.targets.list()
    expect(Array.isArray(sdkIdentityList.data)).toBe(true)
  })

  test('SDK can get targets with filters', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test Target',
      url: 'https://example.com',
      handle: testHandle,
      template: '{}'
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/targets', payload)
    CREATED_TARGET_IDS.push(createdData.id)

    const params: RequestParams = {
      'filter[handle]': payload.handle
    }

    const { data } = await omneo.targets.list(params)
    expect(data.length).toBeGreaterThan(0)

    const arrayIsFiltered = data.every((target) => target.handle === payload.handle)
    const sdkTarget = data[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkTarget).toEqual(expect.objectContaining({
      id: createdData.id,
      handle: payload.handle,
      url: payload.url,
      template: payload.template
    }))
  })
})

afterAll(async () => {
  if (CREATED_TARGET_IDS.length > 0) {
    for (const targetId of CREATED_TARGET_IDS) {
      console.log('Cleaning up SDK Target with ID', targetId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/targets/${targetId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Target ID ${targetId} deleted`)
      } else {
        console.log(`Failed to delete Target ID ${targetId}`, deleteResponse)
      }
    }
  }
})
