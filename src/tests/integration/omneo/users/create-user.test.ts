import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_USER_IDS : number[] = []
const getHandle = () => `sdk_unit_test_user_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Users create', () => {
  test('SDK can create a user', async () => {
    const testHandle = getHandle()
    const password = randomString(32)
    const payload = {
      name: 'SDK Unit Test Create User',
      email: `${testHandle}@example.com`,
      throttle: 1000,
      password,
      password_confirmation: password,
      roles: [{ id: 1 }]
    }

    const user = await omneo.users.create(payload)
    CREATED_USER_IDS.push(user.id)

    expect(user.name).toEqual(payload.name)
    expect(user.throttle).toEqual(payload.throttle)
    expect(user.roles.length).toEqual(1)
    expect(user.roles[0].id).toEqual(1)
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
