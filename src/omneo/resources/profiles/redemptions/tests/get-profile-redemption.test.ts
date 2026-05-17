import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { BenefitDefinitionInput, ClaimBenefitInput } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_BENEFIT_IDS: number[] = []
const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): BenefitDefinitionInput => ({
  name: getRandomString('sdk_unit_test_profile_redemption_get_name'),
  handle: getRandomString('sdk_unit_test_profile_redemption_get_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true,
  is_reclaimable: true,
  claim_period_start_at: '2025-01-01 00:00:00',
  claim_period_end_at: '2030-01-01 00:00:00'
})

describe('Get Profile Redemption', () => {
  test('SDK Get Profile Redemption', async () => {
    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const claimInput: ClaimBenefitInput = {
      definition: definitionPayload.handle as string,
      timezone: 'Australia/Melbourne'
    }

    const { data: createdRedemption } = await simpleOmneoRequest(
      'POST',
      `/profiles/${testProfileID}/benefits/claim-redeem`,
      claimInput
    )
    for (const item of createdRedemption.items) {
      if (item.type === 'benefit' && item.type_attributes?.id) {
        CREATED_BENEFIT_IDS.push(item.type_attributes.id)
      }
    }

    const redemption = await omneoClient.profiles.redemptions.get(testProfileID, createdRedemption.id)

    expect(redemption.id).toBe(createdRedemption.id)
    expect(redemption.profile_id).toBe(testProfileID)
    expect(Array.isArray(redemption.items)).toBe(true)
    expect(redemption.items.length).toBeGreaterThan(0)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Get Profile Redemption, Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }

  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Get Profile Redemption, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
