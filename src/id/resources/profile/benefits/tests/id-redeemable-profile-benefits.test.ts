import { describe, expect, afterAll } from 'vitest'
import { RequestCreateBenefitDefinition, RequestClaimBenefit } from '@types'
import { ID } from '@id'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '@id-tests/test-with-id-data'

const CREATED_BENEFIT_DEFINITION_IDS: number[] = []
const CREATED_BENEFIT_IDS: number[] = []

const buildDefinitionPayload = (): RequestCreateBenefitDefinition => ({
  name: getRandomString('id_sdk_unit_test_id_profile_benefit_redeemable_name'),
  handle: getRandomString('id_sdk_unit_test_id_profile_benefit_redeemable_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true
})

describe('ID Redeemable Profile Benefits', () => {
  testWithIDData('ID SDK Redeemable Profile Benefits', async ({ IDData }) => {
    const { profile, tokenData } = IDData

    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const claimInput: RequestClaimBenefit = {
      definition: definitionPayload.handle as string,
      timezone: 'Australia/Melbourne'
    }
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const redemption = await IDClient.profile.benefits.claimRedeem(claimInput)
    for (const item of redemption.items) {
      CREATED_BENEFIT_IDS.push(item.type_attributes!.id)
    }
    const params = {
      'filter[benefit_definition_id]': definitionResponse.data.id
    }
    const response = await IDClient.profile.benefits.redeemable(params)
    const benefits = response.data ?? []

    expect(Array.isArray(benefits)).toBe(true)
    const target = benefits.find((b) => {
      return b.definition.handle === definitionPayload.handle
    })
    expect(target).toBeDefined()
    expect(target?.profile_id).toBe(profile.id)
    expect(target?.definition.name).toBe(definitionPayload.name)
    expect(target?.definition.handle).toBe(definitionPayload.handle)
    expect(target?.definition.period).toBe(definitionPayload.period)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Redeemable Profile Benefits, Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Redeemable Profile Benefits, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
