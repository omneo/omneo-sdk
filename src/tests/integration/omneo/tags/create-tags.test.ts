import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_TAG_IDS : number[] = []
const getHandle = () => `sdk_unit_test_tag_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Tags create', () => {
  test('SDK can create a tag', async () => {
    const payload = {
      handle: getHandle()
    }

    const tag = await omneo.tags.create(payload)
    CREATED_TAG_IDS.push(tag.id)

    expect(tag).toHaveProperty('handle', payload.handle)
  })
})

afterAll(async () => {
  if (CREATED_TAG_IDS.length > 0) {
    for (const tagId of CREATED_TAG_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/tags/${tagId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Tag ID ${tagId} deleted`)
      } else {
        console.log(`Failed to delete Tag ID ${tagId}`, deleteResponse)
      }
    }
  }
})
