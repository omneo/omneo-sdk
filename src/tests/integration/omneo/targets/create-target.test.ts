import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_TARGET_IDS : number[] = []
const getHandle = () => `sdk_unit_test_target_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Targets create', () => {
  test('SDK can create a target', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test Target Create',
      url: 'https://example.com',
      handle: testHandle,
      template: '{}'
    }

    const target = await omneo.targets.create(payload)
    CREATED_TARGET_IDS.push(target.id)
    expect(target).toEqual(expect.objectContaining({
      name: payload.name,
      url: payload.url,
      handle: payload.handle,
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
