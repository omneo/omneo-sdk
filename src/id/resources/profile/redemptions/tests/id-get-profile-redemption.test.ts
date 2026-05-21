import { describe, expect, afterAll } from 'vitest'
import { RequestCreateBenefitDefinition, RequestClaimBenefit } from '@types'
import { ID } from '@id'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '@id-tests/test-with-id-data'

const CREATED_BENEFIT_IDS: number[] = []
const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): RequestCreateBenefitDefinition => ({
  name: getRandomString('sdk_unit_test_id_profile_redemption_get_name'),
  handle: getRandomString('sdk_unit_test_id_profile_redemption_get_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true,
  is_reclaimable: true,
  claim_period_start_at: '2025-01-01 00:00:00',
  claim_period_end_at: '2030-01-01 00:00:00'
})

describe('ID Get Profile Redemption', () => {
  testWithIDData('ID SDK Get Profile Redemption', async ({ IDData }) => {
    const { profile, tokenData } = IDData

    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const claimInput: RequestClaimBenefit = {
      definition: definitionPayload.handle as string,
      timezone: 'Australia/Melbourne'
    }

    const createdRedemption = await IDClient.profile.benefits.claimRedeem(claimInput)

    for (const item of createdRedemption.items) {
      if (item.type === 'benefit' && item.type_attributes?.id) {
        CREATED_BENEFIT_IDS.push(item.type_attributes.id)
      }
    }

    const redemption = await IDClient.profile.redemptions.get(createdRedemption.id)

    expect(redemption.id).toBe(createdRedemption.id)
    expect(redemption.profile_id).toBe(profile.id)
    expect(Array.isArray(redemption.items)).toBe(true)
    expect(redemption.items.length).toBeGreaterThan(0)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Get Profile Redemption, Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }

  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Get Profile Redemption, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
