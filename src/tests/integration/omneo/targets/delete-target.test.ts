import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const FAILED_DELETED_TARGET_IDS : number[] = []
const getHandle = () => `sdk_unit_test_target_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Targets delete', () => {
  test('SDK can delete a target', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test Target Delete',
      url: 'https://example.com',
      handle: testHandle,
      template: '{}'
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/targets', payload)
    await omneo.targets.delete(createdData.id).catch(() => {
      FAILED_DELETED_TARGET_IDS.push(createdData.id)
    })
    const deleteResponse = await simpleOmneoRequest('GET', `/targets/${createdData.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETED_TARGET_IDS.find((t) => t === createdData.id)) {
      FAILED_DELETED_TARGET_IDS.push(createdData.id)
    }

    expect(deleteResponse.message).toEqual(`No query results for model [App\\Models\\Target] ${createdData.id}`)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_TARGET_IDS.length > 0) {
    for (const targetId of FAILED_DELETED_TARGET_IDS) {
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
