import { describe, expect, test, afterAll } from 'vitest'
import { RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_STATUS_IDS : number[] = []
const getHandle = () => `sdk_unit_test_status_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Statuses list', () => {
  test('SDK can list statuses.', async () => {
    const sdkIdentityList = await omneo.statuses.list()
    expect(Array.isArray(sdkIdentityList.data)).toBe(true)
  })

  test('SDK can get statuses with filters', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test Status List',
      handle: testHandle
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/statuses', payload)
    CREATED_STATUS_IDS.push(createdData.id)

    const params?: RequestParams = {
      'filter[handle]': payload.handle
    }

    const { data } = await omneo.statuses.list(params)
    expect(data.length).toBeGreaterThan(0)

    const arrayIsFiltered = data.every((target) => target.handle === payload.handle)
    const sdkTarget = data[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkTarget).toEqual(expect.objectContaining({
      id: createdData.id,
      handle: payload.handle
    }))
  })
})

afterAll(async () => {
  if (CREATED_STATUS_IDS.length > 0) {
    for (const targetId of CREATED_STATUS_IDS) {
      console.log('Cleaning up SDK Status with ID', targetId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/statuses/${targetId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Status ID ${targetId} deleted`)
      } else {
        console.log(`Failed to delete Status ID ${targetId}`, deleteResponse)
      }
    }
  }
})
