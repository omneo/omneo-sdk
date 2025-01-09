import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import randomString from '../../../lib/string/random'

const CREATED_PROFILE_IDS : string[] = []

const getHandle = () => `sdk_unit_test_search_identity_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Identities search', () => {
  test('SDK can search profiles with identifier.', async () => {
    const identifier = randomString(11)
    const payload = {
      first_name: 'SDK Unit Test Identities Search Profile',
      last_name: 'SDK Unit Test Identities Search Profile',
      email: `${randomString(5)}-sdk-update-type@example.com`,
      identities: [
        {
          handle: getHandle(),
          identifier
        }
      ],
      profile_type: 'temporary'
    }

    const { data: profile } = await simpleOmneoRequest('POST', '/profiles', payload)
    CREATED_PROFILE_IDS.push(profile.id)

    const profiles = await omneo.identities.searchProfile(identifier)
    expect(profiles.length).toEqual(1)
    expect(profiles[0].id).toEqual(profile.id)
  })
})

afterAll(async () => {
  if (CREATED_PROFILE_IDS.length > 0) {
    for (const profileId of CREATED_PROFILE_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${profileId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Profile ID ${profileId} deleted`)
      } else {
        console.log(`Failed to delete Profile ID ${profileId}`, deleteResponse)
      }
    }
  }
})
