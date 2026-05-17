// my-test.ts
import { test } from 'vitest'
import { Profile } from '@types'
import { simpleOmneoRequest, simpleIDRequest } from '@lib'

type TokenData = {
  token: string
  exp: number
}

let profile: Profile | undefined
let tokenData: TokenData | undefined

async function getProfileAndToken ({ task }: { task: unknown }, use: (value: { profile: Profile, tokenData: TokenData }) => Promise<void>): Promise<void> {
  if (process.env.OMNEO_TEST_PROFILE_ID) {
    profile = await simpleOmneoRequest('GET', `/profiles/${process.env.OMNEO_TEST_PROFILE_ID}`).then(({ data }) => data)
  } else {
    profile = profile?.id ? profile : await simpleOmneoRequest('GET', '/profiles').then(({ data }) => data[0])
  }

  if (!profile) throw new Error('Failed to resolve profile data for ID test fixtures')

  tokenData = tokenData?.token
    ? tokenData
    : await simpleIDRequest('POST', 'auth/token', process.env.OMNEO_TOKEN, { id: profile.id }).then(({ data }) => data)

  if (!tokenData) throw new Error('Failed to resolve token data for ID test fixtures')

  await use({ profile, tokenData })
}

export const testWithIDData = test.extend({
  IDData: getProfileAndToken as any
})
