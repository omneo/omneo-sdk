// my-test.ts
import { test } from 'vitest'
import { Profile } from '../../../types'
import simpleOmneoRequest from '../../lib/simple-omneo-request'
import simpleIDRequest from '../../lib/simple-id-request'

let profile
let tokenData

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

async function getProfileAndToken ({ task }, use): Promise<{ profile: Profile, token: { token: string, exp: number }}> {
  profile = profile?.id ? profile : testProfileID ? await simpleOmneoRequest('GET', `/profiles/${testProfileID}`).then(({ data }) => data) : await simpleOmneoRequest('GET', '/profiles').then(({ data }) => data[0])
  tokenData = tokenData?.token
    ? tokenData
    : await simpleIDRequest('POST', 'auth/token', process.env.OMNEO_TOKEN, { id: profile.id }).then(({ data }) => data)
  return use({ profile, tokenData })
}

export const testWithIDData = test.extend({
  IDData: getProfileAndToken as any
})
