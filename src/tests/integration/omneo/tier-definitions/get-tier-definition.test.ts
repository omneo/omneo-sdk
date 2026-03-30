import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('Get Tier Definition', () => {
  test.skip('SDK Get Tier Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_get_tier_definition_name'),
      handle: getRandomString('sdk_unit_test_get_tier_definition_handle'),
      value_min: 30
    }
    const created = await simpleOmneoRequest('POST', '/tiers/definitions', payload)
    CREATED_TIER_DEFINITION_IDS.push(created.data.id)

    const tierDefinition: TierDefinition = await omneoClient.tierDefinitions.get(created.data.id).catch((err) => {
      console.error('SDK Get Tier Definition failed:', err)
      throw new Error('SDK Get Tier Definition failed')
    })

    expect(tierDefinition).toBeDefined()
    expect(tierDefinition.id).toBe(created.data.id)
    expect(tierDefinition.name).toBe(payload.name)
    expect(tierDefinition.handle).toBe(payload.handle)
    expect(tierDefinition.value_min).toBe(payload.value_min)
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
