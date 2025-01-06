import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { BenefitDefinition } from '../../../../types'
import { getRandomString } from './util'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : number[] = []

describe('Benefit Definition update', () => {
  test('SDK Benefit Definition update', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_benefit_definition_update'),
      handle: getRandomString('sdk_unit_test_benefit_definition_update'),
      period: 30
    }
    const response = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
      console.error('SDK update benefit definition created failed:', err)
      throw new Error('SDK update benefit definition created failed')
    })
    CREATED_BENEFIT_DEFINITION_IDS.push(response.data.id)
    const updatedPayload = {
      name: getRandomString('sdk_unit_test_benefit_definition_update')
    }
    const targetBenefitDefinition: BenefitDefinition = await omneo.benefitDefinitions.update(response.data.id, updatedPayload).catch((err) => {
      console.error('SDK Benefit definition created failed:', err)
      throw new Error('SDK Benefit definition created failed')
    })

    expect(targetBenefitDefinition.name).toBe(updatedPayload.name)
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
