// Tests can be re-added once omneo bugs with calculating tiers bugs are fixed, can delete tier definitions
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../..'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('SDK Profile Identities', async () => {
  test('SDK Get a profile\'s identities', async () => {
    const identities = await omneo.profiles.identities.list(testProfileID)
    const hasIdentities = identities.every((identity) => identity.profile_id === testProfileID)
    expect(Array.isArray(identities)).toBe(true)
    expect(hasIdentities).toBe(true)
  })
})
