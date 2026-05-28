import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { RequestCreateBenefitDefinition, RequestClaimBenefit } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_BENEFIT_DEFINITION_IDS: number[] = []
const CREATED_BENEFIT_IDS: number[] = []

const buildDefinitionPayload = (): RequestCreateBenefitDefinition => ({
  name: getRandomString('sdk_unit_test_profile_benefit_redeemable_name'),
  handle: getRandomString('sdk_unit_test_profile_benefit_redeemable_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true
})

describe('Redeemable Profile Benefits', () => {
  test('SDK Redeemable Profile Benefits', async () => {
    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const claimInput: RequestClaimBenefit = {
      definition: definitionPayload.handle as string,
      timezone: 'Australia/Melbourne'
    }

    const benefit = await omneoClient.profiles.benefits.claim(testProfileID, claimInput)
    CREATED_BENEFIT_IDS.push(benefit.id)

    const params = {
      'filter[benefit_definition_id]': definitionResponse.data.id
    }
    const response = await omneoClient.profiles.benefits.redeemable(testProfileID, params)
    const benefits = response.data ?? []

    expect(Array.isArray(benefits)).toBe(true)
    const target = benefits.find((b) => {
      return b.definition.handle === definitionPayload.handle
    })
    expect(target).toBeDefined()
    expect(target?.profile_id).toBe(testProfileID)
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
        console.log(`SDK Redeemable Profile Benefits, Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Redeemable Profile Benefits, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
