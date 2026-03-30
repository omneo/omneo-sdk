import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const FAILED_DELETE_TIER_DEFINITION_IDS: number[] = []

describe('Delete Tier Definition', () => {
  test('SDK Delete Tier Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_delete_tier_definition_name'),
      handle: getRandomString('sdk_unit_test_delete_tier_definition_handle'),
      value_min: 20
    }
    const created = await simpleOmneoRequest('POST', '/tiers/definitions', payload)
    const id: number = created.data.id

    await omneoClient.tierDefinitions.delete(id).catch((err) => {
      console.error(`SDK Delete Tier Definition failed for ID ${id}:`, err)
      FAILED_DELETE_TIER_DEFINITION_IDS.push(id)
      throw new Error(`SDK Delete Tier Definition failed for ID ${id}`)
    })

    const fetchResponse = await simpleOmneoRequest('GET', `/tiers/definitions/${id}`)
    expect(fetchResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  for (const id of FAILED_DELETE_TIER_DEFINITION_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/tiers/definitions/${id}`)
    if (response.status === 204) {
      console.log(`SDK Tier Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Tier Definition ID ${id}`, response)
    }
  }
})
