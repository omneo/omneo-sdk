import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TierPoint, RequestCreateTierPoint } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TIER_POINT_IDS: number[] = []
let createdPointDefinitionId: number

describe('Create Tier Point', () => {
  test('SDK Create Tier Point', async () => {
    const pointDefinitionPayload = {
      name: getRandomString('sdk_unit_test_create_tier_point_def'),
      handle: getRandomString('sdk_unit_test_create_tier_point_def')
    }
    const pointDefinition = await simpleOmneoRequest('POST', '/points/definitions', pointDefinitionPayload)
    createdPointDefinitionId = pointDefinition.data.id

    const payload: RequestCreateTierPoint = {
      profile_id: process.env.OMNEO_TEST_PROFILE_ID as string,
      point_definition_id: pointDefinition.data.id,
      value: 100,
      issued_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      meta: null
    }

    const tierPoint: TierPoint = await omneoClient.tierPoints.create(payload).catch((err) => {
      console.error('SDK Create Tier Point failed:', err)
      throw new Error('SDK Create Tier Point failed')
    })
    CREATED_TIER_POINT_IDS.push(tierPoint.id)

    expect(tierPoint).toBeDefined()
    expect(tierPoint.profile_id).toBe(payload.profile_id)
    expect(tierPoint.point_definition_id).toBe(payload.point_definition_id)
    expect(tierPoint.value).toBe(payload.value)
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
