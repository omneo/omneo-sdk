import { describe, expect, afterAll } from 'vitest'
import { BenefitDefinitionInput } from '@types'
import { ID } from '@id'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): BenefitDefinitionInput => ({
  name: getRandomString('id_sdk_unit_test_id_profile_benefit_claimable_name'),
  handle: getRandomString('id_sdk_unit_test_id_profile_benefit_claimable_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true,
  claim_period_start_at: '2025-01-01 00:00:00',
  claim_period_end_at: '2030-01-01 00:00:00'
})

describe('ID Claimable Profile Benefits', () => {
  testWithIDData('ID SDK Claimable Profile Benefits', async ({ IDData }) => {
    const { tokenData } = IDData

    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const definitions = await IDClient.profile.benefits.claimable()

    expect(Array.isArray(definitions)).toBe(true)
    const target = definitions.find((d) => d.id === String(definitionResponse.data.id))
    expect(target).toBeDefined()
    expect(target?.handle).toBe(definitionPayload.handle)
    expect(target?.name).toBe(definitionPayload.name)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Claimable Profile Benefits, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
