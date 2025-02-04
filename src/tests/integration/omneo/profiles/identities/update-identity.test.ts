import { afterAll, describe, expect, test } from 'vitest'
import { Omneo } from '../../../../..'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import randomString from '../../../../lib/string/random'

const CREATED_IDENTITY_HANDLES : string[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Identity update', () => {
  test('SDK can update profile identity.', async () => {
    const payload = {
      handle: `sdk_unit_test_identity_update_${Math.floor(Date.now() / 1000)}`,
      identifier: randomString(10)
    }
    const { data: identity } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/identities`, payload)
    CREATED_IDENTITY_HANDLES.push(identity.handle)

    const newIdentifier = randomString(10)
    const update = await omneo.profiles.identities.update(testProfileID, identity.handle, {
      identifier: newIdentifier
    })
    expect(update.id).toEqual(identity.id)
    expect(update.handle).toEqual(payload.handle)
    expect(update.identifier).toEqual(newIdentifier)
  })
})

afterAll(async () => {
  if (CREATED_IDENTITY_HANDLES.length > 0) {
    for (const handle of CREATED_IDENTITY_HANDLES) {
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
