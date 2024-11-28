import { describe, expect, test, afterAll } from 'vitest'
import jwt from 'jsonwebtoken'
import { IdentityResponse, RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { testWithIDData } from '../../id/test-with-id-data'
import randomString from '../../../lib/string/random'

const CREATED_IDENTITIES : string[] = []
const identityHandleName = 'sdk_unit_test_identity'
const PROFILE_IDS : string[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Identities list', () => {
  test('SDK can get identities.', async () => {
    const sdkIdentityList = await omneo.identities.list()
    expect(Array.isArray(sdkIdentityList)).toBe(true)
  })
  testWithIDData('SDK can get identities with filters', async ({ IDData }) => {
    const { tokenData } = IDData
    const { pid: decodedProfileID } = jwt.decode(tokenData.token)
    PROFILE_IDS.push(decodedProfileID)
    const payload = {
      handle: identityHandleName,
      identifier: randomString(11)
    }
    const { id, handle, profile_id: profileID } = await omneo.profiles.createIdentity(decodedProfileID, payload)
    expect(profileID).toBe(decodedProfileID)
    expect(handle).toBe(identityHandleName)
    CREATED_IDENTITIES.push(id)

    const params: RequestParams = {
      'filter[handle]': identityHandleName,
      include: 'profile'
    }
    const sdkIdentity = await omneo.identities.list(params).then((data) => data[0])
    expect(sdkIdentity.id).toBeTypeOf('number')
    expect(sdkIdentity.profile_id).toBeTypeOf('string')
    expect(sdkIdentity.identifier).toBeTypeOf('string')
    expect(sdkIdentity).toEqual(expect.objectContaining({
      handle: identityHandleName,
      is_active: true
    }))
  })
  testWithIDData('SDK can get identities with pagination', async ({ IDData }) => {
    const { tokenData } = IDData
    const { pid: decodedProfileID } = jwt.decode(tokenData.token)
    PROFILE_IDS.push(decodedProfileID)
    const payload = {
      handle: identityHandleName,
      identifier: randomString(11)
    }
    const { id, handle, profile_id: profileID } = await omneo.profiles.createIdentity(decodedProfileID, payload)
    expect(profileID).toBe(decodedProfileID)
    expect(handle).toBe(identityHandleName)
    CREATED_IDENTITIES.push(id)

    const params: RequestParams = {
      'filter[handle]': 'apple_device_id',
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
  if (PROFILE_IDS.length > 0 && CREATED_IDENTITIES.length > 0) {
    const profileId: string = PROFILE_IDS[0]
    for (const identityId of CREATED_IDENTITIES) {
      console.log('Cleaning up SDK Identity with ID', identityId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${profileId}/identities/${identityId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Identity ID ${identityId} deleted`)
      }
    }
  }
})
