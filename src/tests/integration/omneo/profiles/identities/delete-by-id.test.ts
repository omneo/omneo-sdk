import { afterAll, describe, expect, test } from 'vitest'
import { Omneo } from '../../../../..'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import randomString from '../../../../lib/string/random'

const FAILED_DELETED_IDENTITIY_HANDLES : string[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Identity update', () => {
  test('SDK can delete profile identity by ID.', async () => {
    const payload = {
      handle: `sdk_unit_test_identity_delete_by_id${Math.floor(Date.now() / 1000)}`,
      identifier: randomString(10)
    }
    const { data: identity } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/identities`, payload)

    await omneo.profiles.identities.deleteByID(testProfileID, identity.id).catch((err) => {
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
    for (const handle of FAILED_DELETED_IDENTITIY_HANDLES) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/identities/${handle}`)
      if (deleteResponse.status < 200 || deleteResponse.status >= 300) {
        console.log('Failed to delete Identity Handle', handle, deleteResponse)
      }
      if (deleteResponse.status === 204) {
        console.log(`SDK Identity Handle ${handle} deleted`)
      }
    }
  }
})
