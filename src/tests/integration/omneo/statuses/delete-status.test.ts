import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const FAILED_DELETED_STATUS_IDS : number[] = []
const getHandle = () => `sdk_unit_test_status_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Statuses delete', () => {
  test('SDK can delete a status', async () => {
    const payload = {
      name: 'SDK Unit Test Status Delete',
      handle: getHandle()
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/statuses', payload)
    await omneo.statuses.delete(createdData.id).catch(() => {
      FAILED_DELETED_STATUS_IDS.push(createdData.id)
    })
    const deleteResponse = await simpleOmneoRequest('GET', `/statuses/${createdData.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETED_STATUS_IDS.find((t) => t === createdData.id)) {
      FAILED_DELETED_STATUS_IDS.push(createdData.id)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_STATUS_IDS.length > 0) {
    for (const statusId of FAILED_DELETED_STATUS_IDS) {
      console.log('Cleaning up SDK Status with ID', statusId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/statuses/${statusId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Status ID ${statusId} deleted`)
      } else {
        console.log(`Failed to delete Status ID ${statusId}`, deleteResponse)
      }
    }
  }
})
