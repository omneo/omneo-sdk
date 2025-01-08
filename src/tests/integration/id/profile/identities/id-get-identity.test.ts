import { afterAll, describe, expect } from 'vitest'
import { ID } from '../../../../../id'
import { testWithIDData } from '../../test-with-id-data'
import simpleIDRequest from '../../../../lib/simple-id-request'
import randomString from '../../../../lib/string/random'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

const CREATED_IDENTITY_HANDLES: string[] = []

describe('ID identities', () => {
  testWithIDData('ID SDK can list identities', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const payload = {
      identifier: randomString(10),
      handle: `sdk_unit_test_id_handle_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`
    }

    const { data: identity } = await simpleIDRequest('POST', '/profiles/me/identities', tokenData.token, payload)
    CREATED_IDENTITY_HANDLES.push(identity.handle)

    const selectedIdentity = await IDClient.profile.identities.get(identity.handle)
    expect(selectedIdentity.handle).toEqual(payload.handle)
    expect(selectedIdentity.identifier).toEqual(payload.identifier)
  })
})

afterAll(async () => {
  if (CREATED_IDENTITY_HANDLES.length > 0) {
    for (const identityHandle of CREATED_IDENTITY_HANDLES) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/identities/${identityHandle}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Identity ID ${identityHandle} deleted`)
      } else {
        console.log(`Failed to delete Identity ID ${identityHandle}`, deleteResponse)
      }
    }
  }
})
