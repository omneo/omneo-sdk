import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import randomString from '../../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const CREATED_PROFILE_IDS : string[] = []

describe('Profile Update Type', () => {
  test('SDK Can Update Profile Type', async () => {
    const payload = {
      first_name: 'SDK Unit Test Profile Update Type',
      last_name: 'SDK Unit Test Profile Update Type',
      email: `${randomString(5)}-sdk-update-type@example.com`,
      profile_type: 'temporary'
    }

    const { data: profile } = await simpleOmneoRequest('POST', '/profiles', payload)
    CREATED_PROFILE_IDS.push(profile.id)

    const updatedProfile = await omneo.profiles.updateType(profile.id, 'active')
    expect(updatedProfile.profile_type).toEqual('active')
  })
})

afterAll(async () => {
  if (CREATED_PROFILE_IDS.length > 0) {
    for (const id of CREATED_PROFILE_IDS) {
      console.log('Omneo Cleaning up Profile with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`Omneo Profile ID ${id} deleted`)
      }
    }
  }
})
