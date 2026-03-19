import { describe, expect, afterAll } from 'vitest'
import { BenefitDefinitionInput } from '@types'
import { ID } from '@id'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): BenefitDefinitionInput => ({
  name: getRandomString('sdk_unit_test_id_profile_benefit_viewable_name'),
  handle: getRandomString('sdk_unit_test_id_profile_benefit_viewable_handle'),
  period: 30,
  is_published: true,
  is_assignable: true,
  is_claimable: true
})

describe('ID Viewable Profile Benefits', () => {
  testWithIDData('ID SDK Viewable Profile Benefits', async ({ IDData }) => {
    const { tokenData } = IDData

    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const definitions = await IDClient.profile.benefits.viewable()

    expect(Array.isArray(definitions)).toBe(true)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Viewable Profile Benefits, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
