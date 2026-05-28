import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { RequestCreateBenefitDefinition } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const CREATED_BENEFIT_DEFINITION_IDS: number[] = []

const buildDefinitionPayload = (): RequestCreateBenefitDefinition => ({
  name: getRandomString('sdk_unit_test_profile_benefit_viewable_name'),
  handle: getRandomString('sdk_unit_test_profile_benefit_viewable_handle'),
  period: 30,
  is_archived: false,
  is_published: true,
  is_assignable: true,
  is_claimable: true,
  claim_period_start_at: '2026-01-01 08:28:43',
  claim_period_end_at: '2036-10-01 08:28:43',
  view_condition: {
    '!!': [
      true
    ]
  },
  claim_condition: {
    '!!': [
      false
    ]
  }
})

describe('Viewable Profile Benefits', () => {
  test('SDK Viewable Profile Benefits', async () => {
    const definitionPayload = buildDefinitionPayload()
    const definitionResponse = await simpleOmneoRequest('POST', '/benefits/definitions', definitionPayload)
    CREATED_BENEFIT_DEFINITION_IDS.push(definitionResponse.data.id)

    const definitions = await omneoClient.profiles.benefits.viewable(testProfileID, definitionResponse.data.id)

    expect(Array.isArray(definitions)).toBe(true)
    const target = definitions.find((d) => d.handle === definitionPayload.handle)
    expect(target).toBeDefined()
    expect(target?.name).toBe(definitionPayload.name)
    expect(target?.period).toBe(definitionPayload.period)
    expect(target?.is_archived).toBe(definitionPayload.is_archived)
    expect(target?.is_published).toBe(definitionPayload.is_published)
    expect(target?.is_assignable).toBe(definitionPayload.is_assignable)
    expect(target?.is_claimable).toBe(definitionPayload.is_claimable)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Viewable Profile Benefits, Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
