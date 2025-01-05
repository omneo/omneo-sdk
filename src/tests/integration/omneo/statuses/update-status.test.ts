import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_STATUS_IDS : number[] = []
const getHandle = () => `sdk_unit_test_status_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Statuses update', () => {
  test('SDK can update a status', async () => {
    const testHandle = getHandle()
    const payload = {
      name: 'SDK Unit Test Status Update',
      handle: testHandle
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/statuses', payload)
    CREATED_STATUS_IDS.push(createdData.id)

    const randomUpdatedString = randomString(10)
    const updatePayload = {
      short_description: `Updated short description ${randomUpdatedString}`,
      long_description: `Updated long description ${randomUpdatedString}`,
      terms_conditions: `Updated terms and conditions ${randomUpdatedString}`,
      name: randomUpdatedString
    }
    const status = await omneo.statuses.update(createdData.id, updatePayload)

    expect(status.short_description).toEqual(updatePayload.short_description)
    expect(status.long_description).toEqual(updatePayload.long_description)
    expect(status.terms_conditions).toEqual(updatePayload.terms_conditions)
    expect(status.name).toEqual(updatePayload.name)
  })
})

afterAll(async () => {
  if (CREATED_STATUS_IDS.length > 0) {
    for (const statusId of CREATED_STATUS_IDS) {
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
