import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const FAILED_DELETED_USER_IDS : number[] = []
const getHandle = () => `sdk_unit_test_user_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Users delete', () => {
  test('SDK can delete a user', async () => {
    const testHandle = getHandle()
    const password = randomString(32)

    const payload = {
      name: 'SDK Unit Test Create User',
      email: `${testHandle}@example.com`,
      password,
      password_confirmation: password
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/users', payload)
    await omneo.users.delete(createdData.id).catch(() => {
      FAILED_DELETED_USER_IDS.push(createdData.id)
    })
    const deleteResponse = await simpleOmneoRequest('GET', `/users/${createdData.id}`)
    if (deleteResponse?.body?.id && !FAILED_DELETED_USER_IDS.find((u) => u === createdData.id)) {
      FAILED_DELETED_USER_IDS.push(createdData.id)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_USER_IDS.length > 0) {
    for (const userId of FAILED_DELETED_USER_IDS) {
      console.log('Cleaning up SDK User with ID', userId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/users/${userId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK User ID ${userId} deleted`)
      } else {
        console.log(`Failed to delete User ID ${userId}`, deleteResponse)
      }
    }
  }
})
