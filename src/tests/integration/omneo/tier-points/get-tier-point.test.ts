import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierPoint } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_POINT_IDS: number[] = []

describe('Get Tier Point', () => {
  test('SDK Get Tier Point', async () => {
    const pointDefinitionPayload = {
      name: getRandomString('sdk_unit_test_get_tier_point_def'),
      handle: getRandomString('sdk_unit_test_get_tier_point_def')
    }
    const pointDefinition = await simpleOmneoRequest('POST', '/points/definitions', pointDefinitionPayload)

    const payload = {
      profile_id: process.env.OMNEO_TEST_PROFILE_ID as string,
      point_definition_id: pointDefinition.data.id,
      value: 50,
      issued_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    const created = await simpleOmneoRequest('POST', '/tiers/points', payload)
    CREATED_TIER_POINT_IDS.push(created.data.id)

    const tierPoint: TierPoint = await omneoClient.tierPoints.get(created.data.id).catch((err) => {
      console.error('SDK Get Tier Point failed:', err)
      throw new Error('SDK Get Tier Point failed')
    })

    expect(tierPoint).toBeDefined()
    expect(tierPoint.id).toBe(created.data.id)
    expect(tierPoint.profile_id).toBe(payload.profile_id)
    expect(tierPoint.value).toBe(payload.value)

    await simpleOmneoRequest('DELETE', `/points/definitions/${pointDefinition.data.id}`)
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
})
