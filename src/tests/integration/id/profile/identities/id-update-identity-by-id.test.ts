import { afterAll, describe, expect } from 'vitest'
import { ID } from '../../../../../id'
import { testWithIDData } from '../../test-with-id-data'
import simpleIDRequest from '../../../../lib/simple-id-request'
import randomString from '../../../../lib/string/random'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

const CREATED_IDENTITY_HANDLES: string[] = []

describe('ID identities', () => {
  testWithIDData('ID SDK can list identities by ID', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const payload = {
      handle: `sdk_unit_test_identity_update_by_id_${Math.floor(Date.now() / 1000)}`,
      identifier: randomString(10)
    }
    const { data: identity } = await simpleIDRequest('POST', '/profiles/me/identities', tokenData.token, payload)
    CREATED_IDENTITY_HANDLES.push(identity.handle)

    const newIdentifier = randomString(10)
    const update = await IDClient.profile.identities.updateByID(identity.id, {
      identifier: newIdentifier
    })
    expect(update.id).toEqual(identity.id)
    expect(update.handle).toEqual(payload.handle)
    expect(update.identifier).toEqual(newIdentifier)
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
