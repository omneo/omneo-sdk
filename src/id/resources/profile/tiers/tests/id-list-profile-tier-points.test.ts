import { describe, expect, afterAll } from 'vitest'
import { ID } from '@id'
import { TierPointsResponse } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '@id-tests/test-with-id-data'

const CREATED_TIER_POINT_IDS: number[] = []
let createdPointDefinitionId: number

describe('ID Profile Tiers - List Tier Points', () => {
  testWithIDData('ID SDK can list profile tier points', async ({ IDData }) => {
    const { tokenData } = IDData

    const pointDefinitionPayload = {
      name: getRandomString('sdk_unit_test_id_profile_tier_point'),
      handle: getRandomString('sdk_unit_test_id_profile_tier_point')
    }
    const pointDefinition = await simpleOmneoRequest('POST', '/points/definitions', pointDefinitionPayload)
    createdPointDefinitionId = pointDefinition.data.id

    const payload = {
      profile_id: IDData.profile.id,
      point_definition_id: pointDefinition.data.id,
      value: 100,
      issued_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    const created = await simpleOmneoRequest('POST', '/tiers/points', payload)
    CREATED_TIER_POINT_IDS.push(created.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const response: TierPointsResponse = await IDClient.profile.tiers.points().catch((err) => {
      console.error('ID SDK List Profile Tier Points failed:', err)
      throw new Error('ID SDK List Profile Tier Points failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    const tierPoint = response.data[0]
    expect(tierPoint).toHaveProperty('profile_id')
    expect(tierPoint).toHaveProperty('point_definition_id')
    expect(tierPoint).toHaveProperty('value')
    expect(tierPoint).toHaveProperty('issued_at')
    expect(tierPoint).toHaveProperty('accrued_at')
    expect(tierPoint).toHaveProperty('status')
    expect(tierPoint).toHaveProperty('source_id')
    expect(tierPoint).toHaveProperty('source_type')
    expect(tierPoint).toHaveProperty('source')
  })
})

afterAll(async () => {
  for (const id of CREATED_TIER_POINT_IDS) {
    const response = await simpleOmneoRequest('DELETE', `/tiers/points/${id}`)
    if (response.status === 204) {
      console.log(`ID SDK Tier Point ID ${id} deleted`)
    } else {
      console.log(`ID Failed to delete Tier Point ID ${id}`, response)
    }
  }
  if (createdPointDefinitionId) {
    const response = await simpleOmneoRequest('DELETE', `/points/definitions/${createdPointDefinitionId}`)
    if (response.status === 204) {
      console.log(`ID SDK Point Definition ID ${createdPointDefinitionId} deleted`)
    }
  }
})
