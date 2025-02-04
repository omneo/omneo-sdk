import { afterAll, describe, expect } from 'vitest'
import { ID } from '../../../../../id'
import { testWithIDData } from '../../test-with-id-data'
import simpleIDRequest from '../../../../lib/simple-id-request'
import randomString from '../../../../lib/string/random'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

const FAILED_DELETED_IDENTITIY_HANDLES: string[] = []

describe('ID identities', () => {
  testWithIDData('ID SDK can list identities by ID', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const payload = {
      handle: `sdk_unit_test_identity_delete_by_id${Math.floor(Date.now() / 1000)}`,
      identifier: randomString(10)
    }
    const { data: identity } = await simpleIDRequest('POST', '/profiles/me/identities', tokenData.token, payload)

    await IDClient.profile.identities.deleteByID(identity.id).catch((err) => {
      console.error(`SDK identity delete by id failed with id:${identity.id}`, err)
      FAILED_DELETED_IDENTITIY_HANDLES.push(identity.handle)
      throw new Error(`SDK Brand delete failed with id:${identity.id}`)
    })

    const deleteResponse = await simpleOmneoRequest('GET', `/profiles/${testProfileID}/identities/id/${identity.id}`)
    if (deleteResponse?.data?.id) {
      FAILED_DELETED_IDENTITIY_HANDLES.push(identity.handle)
    }
    expect(deleteResponse.status).toEqual(404)
  })
})

afterAll(async () => {
  if (FAILED_DELETED_IDENTITIY_HANDLES.length > 0) {
    for (const identityHandle of FAILED_DELETED_IDENTITIY_HANDLES) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/identities/${identityHandle}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Identity ID ${identityHandle} deleted`)
      } else {
        console.log(`Failed to delete Identity ID ${identityHandle}`, deleteResponse)
      }
    }
  }
})
