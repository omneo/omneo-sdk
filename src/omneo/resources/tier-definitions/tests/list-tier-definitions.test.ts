import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierDefinitionResponse } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_DEFINITION_IDS: number[] = []

describe('List Tier Definitions', () => {
  test('SDK List Tier Definitions', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_list_tier_definitio_name'),
      handle: getRandomString('sdk_unit_test_list_tier_definition_handle'),
      value_min: 40
    }
    const created = await simpleOmneoRequest('POST', '/tiers/definitions', payload)
    CREATED_TIER_DEFINITION_IDS.push(created.data.id)

    const params = {
      filter: {
        handle: payload.handle
      }
    }
    const response: TierDefinitionResponse = await omneoClient.tierDefinitions.list(params).catch((err) => {
      console.error('SDK List Tier Definitions failed:', err)
      throw new Error('SDK List Tier Definitions failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    const found = response.data.find((d) => d.id === created.data.id)
    expect(found).toBeDefined()
    expect(found?.name).toBe(payload.name)
    expect(found?.handle).toBe(payload.handle)
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
