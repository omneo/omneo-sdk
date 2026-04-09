import { describe, expect, afterAll } from 'vitest'
import { ID } from '@id'
import { TierProgress } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('ID Profile Tiers - Calculate', () => {
  testWithIDData('ID SDK can calculate a profile tier', async ({ IDData }) => {
    const { tokenData } = IDData
    let tierDefinition: any

    // First, try to get existing tier definitions
    const existingDefinitions = await simpleOmneoRequest('GET', '/tiers/definitions')

    if (existingDefinitions.data && existingDefinitions.data.length > 0) {
      // Use the first existing tier definition
      tierDefinition = { data: existingDefinitions.data[0] }
    } else {
      // Create a new tier definition if none exist
      const tierDefinitionPayload = {
        name: getRandomString('sdk_unit_test_id_calculate_profile_tier'),
        handle: getRandomString('sdk_unit_test_id_calculate_profile_tier'),
        description: `SDK integration test - ${Date.now()}`,
        value_min: Math.floor(Math.random() * 1000) + 1,
        value_maintain: Math.floor(Math.random() * 1000) + 1,
        is_assignable: true,
        is_floor: false
      }
      tierDefinition = await simpleOmneoRequest('POST', '/tiers/definitions', tierDefinitionPayload)
      CREATED_TIER_DEFINITION_IDS.push(tierDefinition.data.id)
    }

    // Assign tier via direct API call
    await simpleOmneoRequest('POST', `/profiles/${IDData.profile.id}/tiers/assign`, {
      tier: tierDefinition.data.handle
    })

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const tiers: TierProgress = await IDClient.profile.tiers.calculate().catch((err) => {
      console.error('ID SDK Calculate Profile Tier failed:', err)
      throw new Error('ID SDK Calculate Profile Tier failed')
    })

    expect(tiers).toBeDefined()
    expect(tiers.profile_id).toBe(IDData.profile.id)
    expect(tiers).toHaveProperty('current_tier')
    expect(tiers).toHaveProperty('next_tier')
    expect(tiers).toHaveProperty('prev_tier')
  })
})

afterAll(async () => {
  for (const tierDefinitionID of CREATED_TIER_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/tiers/definitions/${tierDefinitionID}`)
    if (response.status === 204) {
      console.log(`ID SDK Tier Definition ID ${tierDefinitionID} deleted`)
    } else {
      console.log(`ID Failed to delete Tier Definition ID ${tierDefinitionID}`, response)
    }
  }
})
