import { afterAll, describe, expect, test } from 'vitest'
import { Omneo } from '@omneo'
import { TierProgress } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('Profile Tiers - List', () => {
  test('SDK can list profile tiers', async () => {
    let tierDefinition: any

    // First, try to get existing tier definitions
    const existingDefinitions = await simpleOmneoRequest('GET', '/tiers/definitions')
    if (existingDefinitions.data && existingDefinitions.data.length > 0) {
      // Use the first existing tier definition
      tierDefinition = { data: existingDefinitions.data[0] }
    } else {
      // Create a new tier definition if none exist
      const tierDefinitionPayload = {
        name: getRandomString('sdk_unit_test_list_profile_tier'),
        handle: getRandomString('sdk_unit_test_list_profile_tier'),
        description: `SDK integration test - ${Date.now()}`,
        value_min: Math.floor(Math.random() * 1000) + 1,
        value_maintain: Math.floor(Math.random() * 1000) + 1,
        is_assignable: true,
        is_floor: false
      }
      tierDefinition = await simpleOmneoRequest('POST', '/tiers/definitions', tierDefinitionPayload)
      // CREATED_TIER_DEFINITION_IDS.push(tierDefinition.data.id)
    }

    await simpleOmneoRequest('POST', `/profiles/${testProfileID}/tiers/assign`, {
      tier: tierDefinition.data.handle
    })

    const tiers: TierProgress = await omneoClient.profiles.tiers.list(testProfileID).catch((err) => {
      console.error('SDK List Profile Tiers failed:', err)
      throw new Error('SDK List Profile Tiers failed')
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
      console.log(`Failed to delete Tier Definition ID ${tierDefinitionID}`, response)
    }
  }
})
