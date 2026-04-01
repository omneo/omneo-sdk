import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierDefinition, UpdateTierDefinitionInput } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('Update Tier Definition', () => {
  test('SDK Update Tier Definition', async () => {
    const createPayload = {
      name: getRandomString('sdk_unit_test_update_tier_definition_name'),
      handle: getRandomString('sdk_unit_test_update_tier_definition_handle'),
      value_min: 50,
      value_maintain: 50,
      description: 'Original description'
    }
    const created = await simpleOmneoRequest('POST', '/tiers/definitions', createPayload)
    CREATED_TIER_DEFINITION_IDS.push(created.data.id)

    const updatePayload: UpdateTierDefinitionInput = {
      name: getRandomString('sdk_unit_test_update_tier_definition_updated'),
      value_min: 2000,
      value_maintain: 1000,
      description: 'Updated description'
    }

    const tierDefinition: TierDefinition = await omneoClient.tierDefinitions.update(created.data.id, updatePayload).catch((err) => {
      console.error('SDK Update Tier Definition failed:', err)
      throw new Error('SDK Update Tier Definition failed')
    })

    expect(tierDefinition).toBeDefined()
    expect(tierDefinition.id).toBe(created.data.id)
    expect(tierDefinition.handle).toBe(createPayload.handle)
    expect(tierDefinition.name).toBe(updatePayload.name)
    expect(tierDefinition.value_min).toBe(updatePayload.value_min)
    expect(tierDefinition.value_maintain).toBe(updatePayload.value_maintain)
    expect(tierDefinition.description).toBe(updatePayload.description)
  })
})

afterAll(async () => {
  for (const id of CREATED_TIER_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/tiers/definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Tier Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Tier Definition ID ${id}`, response)
    }
  }
})
