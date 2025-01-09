import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import randomString from '../../../../lib/string/random'
import { ProfileType } from '../../../../../types'

const BATCHED_PROFILE_IDENTIFIER = randomString(10)

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Profile Batch', () => {
  test('SDK Can Batch Profiles', async () => {
    const payload = [`${BATCHED_PROFILE_IDENTIFIER}-1`, `${BATCHED_PROFILE_IDENTIFIER}-2`].map((id) => {
      return {
        first_name: 'SDK test profile batch',
        last_name: id,
        email: `${id}-sdk-test-profile-batch@example.com`,
        profile_type: 'deleted' as ProfileType
      }
    })

    const batchResponse = await omneo.profiles.batch('email', payload)
    expect(batchResponse.data.message).toEqual('Profiles queued for batch import.')
  })
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // unreliable wait for batch to complete

  const { data: profiles } = await simpleOmneoRequest(
    'GET',
    '/profiles?filter[first_name]=Sdk Test Profile Batch&filter[profile_type]=deleted'
  )
  console.log(`Deleting ${profiles.length} profiles found from batch`)
  await Promise.all(profiles.map((profile) => {
    return simpleOmneoRequest('DELETE', `/profiles/${profile.id}`)
  }))
})
