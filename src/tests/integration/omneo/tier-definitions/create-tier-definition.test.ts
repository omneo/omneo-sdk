import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierDefinition, CreateTierDefinitionInput } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('Create Tier Definition', () => {
  test('SDK Create Tier Definition', async () => {
    const payload: CreateTierDefinitionInput = {
      name: getRandomString('sdk_unit_test_create_tier_definition_name'),
      handle: getRandomString('sdk_unit_test_create_tier_definition_handle'),
      value_min: 10,
      value_maintain: 10,
      is_assignable: true,
      description: 'SDK unit test tier definition',
      short_description: 'Gold Tier',
      tags: []
    }

    const tierDefinition: TierDefinition = await omneoClient.tierDefinitions.create(payload).catch((err) => {
      console.error('SDK Create Tier Definition failed:', err)
      throw new Error('SDK Create Tier Definition failed')
    })
    CREATED_TIER_DEFINITION_IDS.push(tierDefinition.id)

    expect(tierDefinition).toBeDefined()
    expect(tierDefinition.name).toBe(payload.name)
    expect(tierDefinition.handle).toBe(payload.handle)
    expect(tierDefinition.value_min).toBe(payload.value_min)
    expect(tierDefinition.value_maintain).toBe(payload.value_maintain)
    expect(tierDefinition.is_assignable).toBe(payload.is_assignable)
    expect(tierDefinition.description).toBe(payload.description)
    expect(tierDefinition.short_description).toBe(payload.short_description)
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
