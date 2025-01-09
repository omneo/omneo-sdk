import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { BenefitDefinitionResponse } from '../../../../types'
import { getRandomString } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : number[] = []

describe('Benefit Definitions list', () => {
  test('SDK List Benefit Definitions', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_benefit_definition_list'),
      handle: getRandomString('sdk_unit_test_benefit_definition_list'),
      period: 30
    }
    const response = await simpleOmneoRequest('POST', '/benefits/definitions', payload)
    CREATED_BENEFIT_DEFINITION_IDS.push(response.data.id)

    const benefitDefinitionsRes: BenefitDefinitionResponse = await omneo.benefitDefinitions.list({
      'filter[handle]': payload.handle
    })
    const { data: benefitDefinitions } = benefitDefinitionsRes
    expect(benefitDefinitions.length).toBe(1)

    const targetBenefitDefinition = benefitDefinitions[0]
    expect(targetBenefitDefinition.name).toBe(payload.name)
    expect(targetBenefitDefinition.handle).toBe(payload.handle)
    expect(targetBenefitDefinition.period).toBe(payload.period)
  })
})

afterAll(async () => {
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
