import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { getRandomString } from '../../../lib/string/util'
import { BenefitDefinitionInput } from '../../../../types'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : string[] = []

describe('Benefit Definition created', () => {
  test('SDK created Benefit Definition', async () => {
    const payload: BenefitDefinitionInput = {
      name: getRandomString('sdk_unit_test_benefit_definition_create'),
      handle: getRandomString('sdk_unit_test_benefit_definition_create'),
      period: 30
    }
    const targetBenefitDefinition = await omneo.benefitDefinitions.create(payload).catch((err) => {
      console.error('SDK Benefit definition created failed:', err)
      throw new Error('SDK Benefit definition created failed')
    })

    CREATED_BENEFIT_DEFINITION_IDS.push(targetBenefitDefinition.id)

    expect(typeof targetBenefitDefinition.id).toBe('string')
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
