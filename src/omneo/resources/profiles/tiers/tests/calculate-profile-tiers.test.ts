import { afterAll, describe, expect, test } from 'vitest'
import { Omneo } from '@omneo'
import { TierProgress } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_DEFINITION_IDS: number[] = []

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
describe('Profile Tiers - Calculate', () => {
  test('SDK can calculate a profile tier', async () => {
    let tierDefinition: any

    // First, try to get existing tier definitions
    const existingDefinitions = await simpleOmneoRequest('GET', '/tiers/definitions')

    if (existingDefinitions.data && existingDefinitions.data.length > 0) {
      // Use the first existing tier definition
      tierDefinition = { data: existingDefinitions.data[0] }
    } else {
      // Create a new tier definition if none exist
      const tierDefinitionPayload = {
        name: getRandomString('sdk_unit_test_calculate_profile_tier'),
        handle: getRandomString('sdk_unit_test_calculate_profile_tier'),
        description: `SDK integration test - ${Date.now()}`,
        value_min: Math.floor(Math.random() * 1000) + 1,
        value_maintain: Math.floor(Math.random() * 1000) + 1,
        is_assignable: true,
        is_floor: false
      }
      tierDefinition = await simpleOmneoRequest('POST', '/tiers/definitions', tierDefinitionPayload)
      CREATED_TIER_DEFINITION_IDS.push(tierDefinition.data.id)
    }

    await simpleOmneoRequest('POST', `/profiles/${testProfileID}/tiers/assign`, {
      tier: tierDefinition.data.handle
    })

    const tiers: TierProgress = await omneoClient.profiles.tiers.calculate(testProfileID).catch((err) => {
      console.error('SDK Calculate Profile Tier failed:', err)
      throw new Error('SDK Calculate Profile Tier failed')
    })

    expect(tiers).toBeDefined()
    expect(tiers.profile_id).toBe(testProfileID)
    expect(tiers).toHaveProperty('current_tier')
    expect(tiers).toHaveProperty('next_tier')
    expect(tiers).toHaveProperty('prev_tier')
  })
})

afterAll(async () => {
  for (const tierDefinitionID of CREATED_TIER_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/tiers/definitions/${tierDefinitionID}`)
    if (response.status === 204) {
      console.log(`SDK Tier Definition ID ${tierDefinitionID} deleted`)
    } else {
      console.error(`Failed to delete SDK Tier Definition ID ${tierDefinitionID}`)
    }
  }
})
