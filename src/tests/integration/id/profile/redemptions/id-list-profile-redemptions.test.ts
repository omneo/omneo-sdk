import { describe, expect, afterAll } from 'vitest'
import { BenefitDefinitionInput, ClaimBenefitInput } from '@types'
import { ID } from '@id'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_BENEFIT_IDS: number[] = []
const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): BenefitDefinitionInput => ({
  name: getRandomString('sdk_unit_test_id_profile_redemption_list_name'),
  handle: getRandomString('sdk_unit_test_id_profile_redemption_list_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true,
  is_reclaimable: true,
  claim_period_start_at: '2025-01-01 00:00:00',
  claim_period_end_at: '2030-01-01 00:00:00'
})

describe('ID List Profile Redemptions', () => {
  testWithIDData('ID SDK List Profile Redemptions', async ({ IDData }) => {
    const { tokenData } = IDData

    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const claimInput: ClaimBenefitInput = {
      definition: definitionPayload.handle as string,
      timezone: 'Australia/Melbourne'
    }

    const createdRedemption = await IDClient.profile.benefits.claimRedeem(claimInput)

    for (const item of createdRedemption.items) {
      if (item.type === 'benefit' && item.type_attributes?.id) {
        CREATED_BENEFIT_IDS.push(item.type_attributes.id)
      }
    }
    const params = {
      has_benefit: true,
      'page[size]': 10
    }
    const response = await IDClient.profile.redemptions.list(params)
    const redemptions = Array.isArray(response.data) ? response.data : []

    expect(Array.isArray(redemptions)).toBe(true)
    expect(redemptions.length).toBeGreaterThan(0)
    const target = redemptions[0]
    expect(target).toBeDefined()
    expect(target).toHaveProperty('profile_id')
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List Profile Redemptions, Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }

  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List Profile Redemptions, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
