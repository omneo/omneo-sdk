import { describe, expect, test, afterAll } from 'vitest'
import { RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_USER_IDS : number[] = []
const getHandle = () => `sdk_unit_test_user_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Users list', () => {
  test('SDK can list users.', async () => {
    const sdkUserList = await omneo.users.list()
    expect(Array.isArray(sdkUserList.data)).toBe(true)
  })

  test('SDK can get users with filters', async () => {
    const testHandle = getHandle()
    const password = randomString(32)
    const payload = {
      name: 'SDK Unit Test List User',
      email: `${testHandle}@example.com`,
      throttle: 1000,
      password,
      password_confirmation: password
    }

    const { data: createdData } = await simpleOmneoRequest('POST', '/users', payload)
    CREATED_USER_IDS.push(createdData.id)

    const params: RequestParams = {
      'filter[name]': payload.name
    }

    const { data } = await omneo.users.list(params)
    expect(data.length).toBeGreaterThan(0)

    const arrayIsFiltered = data.every((user) => user.name === payload.name)
    const sdkUser = data[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkUser.name).toEqual(payload.name)
  })
})

afterAll(async () => {
  if (CREATED_USER_IDS.length > 0) {
    for (const userId of CREATED_USER_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/users/${userId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK User ID ${userId} deleted`)
      } else {
        console.log(`Failed to delete User ID ${userId}`, deleteResponse)
      }
    }
  }
})
