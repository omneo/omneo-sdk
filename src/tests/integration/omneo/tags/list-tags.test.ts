import { describe, expect, test, afterAll } from 'vitest'
import { RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_TAG_IDS : number[] = []
const getHandle = () => `sdk_unit_test_tag_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Tags list', () => {
  // test('SDK can list tags.', async () => {
  //   const sdkTagList = await omneo.tags.list()
  //   expect(Array.isArray(sdkTagList)).toBe(true)
  // })

  test('SDK can get tags with filters', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test Tag List',
      handle: testHandle
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/tags', payload)
    CREATED_TAG_IDS.push(createdData.id)

    const params: RequestParams = {
      'filter[handle]': payload.handle
    }

    const tags = await omneo.tags.list(params)
    expect(tags.length).toBeGreaterThan(0)

    const arrayIsFiltered = tags.every((target) => target.handle === payload.handle)
    const sdkTarget = tags[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkTarget).toEqual(expect.objectContaining({
      id: createdData.id,
      handle: payload.handle
    }))
  })
})

afterAll(async () => {
  if (CREATED_TAG_IDS.length > 0) {
    for (const tagId of CREATED_TAG_IDS) {
      console.log('Cleaning up SDK Tag with ID', tagId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/tags/${tagId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Tag ID ${tagId} deleted`)
      } else {
        console.log(`Failed to delete Tag ID ${tagId}`, deleteResponse)
      }
    }
  }
})
