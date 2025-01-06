import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const FAILED_DELETED_TAG_IDS : number[] = []
const getHandle = () => `sdk_unit_test_tag_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Tags delete', () => {
  test('SDK can delete a tag', async () => {
    const payload = {
      handle: getHandle()
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/tags', payload)
    await omneo.tags.delete(createdData.id).catch(() => {
      FAILED_DELETED_TAG_IDS.push(createdData.id)
    })
    const deleteResponse = await simpleOmneoRequest('GET', `/tags/${createdData.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETED_TAG_IDS.find((t) => t === createdData.id)) {
      FAILED_DELETED_TAG_IDS.push(createdData.id)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_TAG_IDS.length > 0) {
    for (const tagId of FAILED_DELETED_TAG_IDS) {
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
