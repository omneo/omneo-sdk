import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierPointResponse } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_POINT_IDS: number[] = []
let createdPointDefinitionId: number

describe('List Tier Points', () => {
  test('SDK List Tier Points', async () => {
    const pointDefinitionPayload = {
      name: getRandomString('sdk_unit_test_list_tier_point_def'),
      handle: getRandomString('sdk_unit_test_list_tier_point_def')
    }
    const pointDefinition = await simpleOmneoRequest('POST', '/points/definitions', pointDefinitionPayload)
    createdPointDefinitionId = pointDefinition.data.id

    const payload = {
      profile_id: process.env.OMNEO_TEST_PROFILE_ID as string,
      point_definition_id: pointDefinition.data.id,
      value: 75,
      issued_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    const created = await simpleOmneoRequest('POST', '/tiers/points', payload)
    CREATED_TIER_POINT_IDS.push(created.data.id)

    const response: TierPointResponse = await omneoClient.tierPoints.list().catch((err) => {
      console.error('SDK List Tier Points failed:', err)
      throw new Error('SDK List Tier Points failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    const target = response.data[0]
    expect(target).toBeDefined()
    expect(target).toHaveProperty('profile_id')
    expect(target).toHaveProperty('value')
  })
})

afterAll(async () => {
  for (const id of CREATED_TIER_POINT_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/tiers/points/${id}`)
    if (response.status === 204) {
      console.log(`SDK Tier Point ID ${id} deleted`)
    } else {
      console.log(`Failed to delete Tier Point ID ${id}`, response)
    }
  }
  if (createdPointDefinitionId) {
    await simpleOmneoRequest('DELETE', `/points/definitions/${createdPointDefinitionId}`)
  }
})
