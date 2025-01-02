import { afterAll, describe, expect } from 'vitest'
import { ID } from '../../../id'
import { testWithIDData } from './test-with-id-data'
import { tier as mockTier } from '../../mocks/tier/tier'
import simpleOmneoRequest from '../../lib/simple-omneo-request'
const CREATED_TIER_DEFINITIONS = [] as number[]

const definitionPayload = {
  name: `id_assign_profile_tier_${Date.now()}`,
  handle: `id_assign_profile_tier_${Date.now()}`,
  description: `ID SDK integration test - ${Date.now()}`,
  value_min: Math.floor(Math.random() * 1000) + 1,
  value_maintain: Math.floor(Math.random() * 1000) + 1,
  is_assignable: true,
  is_floor: false
}

describe('ID tiers', () => {
  testWithIDData('ID SDK can get tiers', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const tiers = await IDClient.profile.getTiers()

    Object.keys(mockTier).forEach((key) => {
      expect(tiers).toHaveProperty(key)
    })

    Object.keys(mockTier.current_tier).forEach((key) => {
      expect(tiers.current_tier).toHaveProperty(key)
    })
  })

  testWithIDData('ID SDK can assign tiers', async ({ IDData }) => {
    const { tokenData } = IDData

    const definition = await simpleOmneoRequest('POST', '/tiers/definitions', definitionPayload).then(({ data }) => {
      CREATED_TIER_DEFINITIONS.push(data.id)
      return data
    })

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const tiers = await IDClient.profile.assignTier(definition.handle)
    expect(tiers.current_tier?.handle === definition.handle)
  })

  testWithIDData('ID SDK can calculate tiers', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const tiers = await IDClient.profile.calculateTiers()

    Object.keys(mockTier).forEach((key) => {
      expect(tiers).toHaveProperty(key)
    })

    Object.keys(mockTier.current_tier).forEach((key) => {
      expect(tiers.current_tier).toHaveProperty(key)
    })
  })
})

// TODO Deleting tier definitions while assigned to a profile causes API errors, re add  this code when bug fixed
afterAll(async () => {
  if (CREATED_TIER_DEFINITIONS.length > 0) {
    for (const tierDefID of CREATED_TIER_DEFINITIONS) {
      console.log('ID Cleaning up SDK Tier Definitions with ID', tierDefID)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/tiers/definitions/${tierDefID}`)
      if (deleteResponse.status < 200 || deleteResponse.status >= 300) {
        console.log('ID Failed to delete Tier Definition ID', tierDefID)
      }
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Tier Definition ID ${tierDefID} deleted`)
      }
    }
  }
})
