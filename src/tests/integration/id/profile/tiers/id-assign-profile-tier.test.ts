import { describe, expect, afterAll } from 'vitest'
import { ID } from '@id'
import { TierProgress } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('ID Profile Tiers - Assign', () => {
  testWithIDData('ID SDK can assign a tier to a profile', async ({ IDData }) => {
    const { tokenData } = IDData
    let tierDefinition: any

    // First, try to get existing tier definitions. The assign endpoint only
    // resolves assignable definitions, so a non-assignable one (e.g. the floor
    // tier) 404s with "No query results for model [App\Models\TierDefinition]"
    const existingDefinitions = await simpleOmneoRequest('GET', '/tiers/definitions')

    const assignableDefinition = existingDefinitions.data?.find((definition: any) => definition.is_assignable)
    if (assignableDefinition) {
      tierDefinition = { data: assignableDefinition }
    } else {
      // Create a new tier definition if none exist
      const tierDefinitionPayload = {
        name: getRandomString('sdk_unit_test_id_assign_tier'),
        handle: getRandomString('sdk_unit_test_id_assign_tier'),
        description: `SDK integration test - ${Date.now()}`,
        value_min: Math.floor(Math.random() * 1000) + 1,
        value_maintain: Math.floor(Math.random() * 1000) + 1,
        is_assignable: true,
        is_floor: false
      }
      tierDefinition = await simpleOmneoRequest('POST', '/tiers/definitions', tierDefinitionPayload)
      CREATED_TIER_DEFINITION_IDS.push(tierDefinition.data.id)
    }

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const result: TierProgress = await IDClient.profile.tiers.assign(tierDefinition.data.handle).catch((err) => {
      console.error('ID SDK Assign Tier to Profile failed:', err)
      throw new Error('ID SDK Assign Tier to Profile failed')
    })

    expect(result).toBeDefined()
    expect(result!.current_tier!.id).toBe(tierDefinition.data.id)
    expect(result!.current_tier!.name).toBe(tierDefinition.data.name)
    expect(result!.current_tier!.handle).toBe(tierDefinition.data.handle)
    expect(result!.current_tier!.description).toBe(tierDefinition.data.description)
    expect(result!.current_tier!.value_min).toBe(tierDefinition.data.value_min)
    expect(result!.current_tier!.value_maintain).toBe(tierDefinition.data.value_maintain)
    expect(result!.current_tier!.is_assignable).toBe(tierDefinition.data.is_assignable)
  })
})

afterAll(async () => {
  if (CREATED_TIER_DEFINITION_IDS.length > 0) {
    for (const tierDefID of CREATED_TIER_DEFINITION_IDS) {
      const response = await simpleOmneoRequest('DELETE', `/tiers/definitions/${tierDefID}`)
      if (response.status === 204) {
        console.log(`ID SDK Tier Definition ID ${tierDefID} deleted`)
      } else {
        console.log(`ID Failed to delete Tier Definition ID ${tierDefID}`, response)
      }
    }
  }
})
