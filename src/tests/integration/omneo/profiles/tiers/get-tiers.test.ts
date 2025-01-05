import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../..'
import { tier as mockTier } from '../../../../mocks/tier/tier'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Tiers', () => {
  test('SDK can get profile tiers.', async () => {
    const tiers = await omneo.profiles.getTiers(testProfileID)
    Object.keys(mockTier).forEach((key) => {
      expect(tiers).toHaveProperty(key)
    })

    Object.keys(mockTier.current_tier).forEach((key) => {
      expect(tiers.current_tier).toHaveProperty(key)
    })
  })
})
