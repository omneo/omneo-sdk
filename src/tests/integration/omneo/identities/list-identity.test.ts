import { describe, expect, test, afterAll } from 'vitest'
import { IdentityResponse, RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_IDENTITY_HANDLES : string[] = []
const getHandle = () => `sdk_unit_test_identity_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Identities list', () => {
  test('SDK can get identities.', async () => {
    const sdkIdentityList = await omneo.identities.list()
    expect(Array.isArray(sdkIdentityList.data)).toBe(true)
  })
  test('SDK can get identities with filters', async () => {
    const testHandle = getHandle()
    const payload = {
      handle: testHandle,
      identifier: randomString(11)
    }
    const { data: { handle, profile_id: profileID } } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/identities`, payload)
    CREATED_IDENTITY_HANDLES.push(handle)
    expect(profileID).toBe(testProfileID)
    expect(handle).toBe(testHandle)

    const params: RequestParams = {
      'filter[handle]': testHandle,
      include: 'profile'
    }
    const { data } = await omneo.identities.list(params)
    expect(data.length).toBeGreaterThan(0)

    const arrayIsFiltered = data.every((identity) => identity.handle === testHandle && identity.is_active === true)
    const sdkIdentity = data[0]
    expect(arrayIsFiltered).toBe(true)
    expect(sdkIdentity.id).toBeTypeOf('number')
    expect(sdkIdentity.profile_id).toBeTypeOf('string')
    expect(sdkIdentity.identifier).toBeTypeOf('string')
    expect(sdkIdentity).toHaveProperty('profile')
    expect(sdkIdentity).toEqual(expect.objectContaining({
      handle: testHandle,
      is_active: true
    }))
  })
  test('SDK can get identities with pagination', async () => {
    const testHandle = getHandle()
    const payload = {
      handle: testHandle,
      identifier: randomString(11)
    }
    const { handle, profile_id: profileID } = await omneo.profiles.createIdentity(testProfileID, payload)
    CREATED_IDENTITY_HANDLES.push(handle)

    expect(profileID).toBe(testProfileID)
    expect(handle).toBe(testHandle)

    const params: RequestParams = {
      'filter[handle]': testHandle,
      include: 'profile',
      withPagination: true
    }
    const { links, meta }: IdentityResponse = await omneo.identities.list(params)

    // links
    expect(links.first).toBeTypeOf('string')
    expect(links.last).toBeTypeOf('string')
    expect(links).toHaveProperty('prev')
    expect(links).toHaveProperty('next')

    // meta
    expect(meta.current_page).toBeTypeOf('number')
    expect(meta.from).toBeTypeOf('number')
    expect(meta.last_page).toBeTypeOf('number')
    expect(meta).toHaveProperty('links')
    expect(meta.path).toBeTypeOf('string')
    expect(meta.per_page).toBeTypeOf('number')
    expect(meta.to).toBeTypeOf('number')
    expect(meta.total).toBeTypeOf('number')
  })
})

afterAll(async () => {
  if (CREATED_IDENTITY_HANDLES.length > 0) {
    for (const identityHandle of CREATED_IDENTITY_HANDLES) {
      console.log('Cleaning up SDK Identity with ID', identityHandle)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/identities/${identityHandle}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Identity ID ${identityHandle} deleted`)
      } else {
        console.log(`Failed to delete Identity ID ${identityHandle}`, deleteResponse)
      }
    }
  }
})
