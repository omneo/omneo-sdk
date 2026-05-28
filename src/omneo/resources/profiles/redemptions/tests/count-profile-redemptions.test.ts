import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { RequestCreateBenefitDefinition, RequestClaimBenefit, Redemption, RedemptionItemTypeEnum } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_BENEFIT_IDS: number[] = []
const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): RequestCreateBenefitDefinition => ({
  name: getRandomString('sdk_unit_test_profile_redemption_count_name'),
  handle: getRandomString('sdk_unit_test_profile_redemption_count_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true,
  is_reclaimable: true,
  claim_period_start_at: '2025-01-01 00:00:00',
  claim_period_end_at: '2030-01-01 00:00:00'
})

describe('Count Profile Redemptions', () => {
  test('SDK Count Profile Redemptions', async () => {
    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const claimInput: RequestClaimBenefit = {
      definition: definitionPayload.handle as string,
      timezone: 'Australia/Melbourne'
    }

    const { data: createdRedemption }: { data: Redemption } = await simpleOmneoRequest(
      'POST',
      `/profiles/${testProfileID}/benefits/claim-redeem`,
      claimInput
    )
    const benefitItem = createdRedemption.items.find((item) => item.type === 'benefit' && item.type_attributes?.id)
    expect(benefitItem).toBeDefined()

    if (benefitItem?.type_attributes?.id) {
      CREATED_BENEFIT_IDS.push(benefitItem.type_attributes.id)
    }

    const redemptionType: RedemptionItemTypeEnum = 'benefit'
    const countResponse = await omneoClient.profiles.redemptions.count(testProfileID, redemptionType, Number(benefitItem?.type_attributes?.id))

    expect(countResponse.count).toBeDefined()
    expect(typeof countResponse.count).toBe('number')
    expect(countResponse.count).toBeGreaterThanOrEqual(1)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Count Profile Redemptions, Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }

  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Count Profile Redemptions, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
