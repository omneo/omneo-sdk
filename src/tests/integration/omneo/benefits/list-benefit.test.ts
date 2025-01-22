import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Benefit, BenefitInput, BenefitResponse } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'
import randomString from '../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : number[] = []
const CREATED_BENEFITS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Benefits list', async () => {
  const payload = {
    name: getRandomString('sdk_unit_test_benefit_list'),
    handle: getRandomString('sdk_unit_test_benefit_list'),
    period: 30
  }
  const { data: definition } = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
    console.error('SDK create benefit definition failed:', err)
    throw new Error('SDK create benefit definition failed')
  })

  CREATED_BENEFIT_DEFINITION_IDS.push(definition.id)

  test('SDK List Benefits', async () => {
    const payload: BenefitInput = {
      profile_id: testProfileID,
      benefit_definition_id: definition.id,
      external_id: randomString(10),
      expires_at: '2024-12-06',
      issued_at: '2024-12-06 08:30:00',
      timezone: 'Australia/Melbourne'
    }

    const benefitResponse = await simpleOmneoRequest('POST', '/benefits', payload).catch((err) => {
      console.error('SDK list benefits created failed:', err)
      throw new Error('SDK list benefits created failed')
    })

    CREATED_BENEFITS_IDS.push(benefitResponse.data.id)

    const { data: benefits }: BenefitResponse = await omneo.benefits.list({
      'filter[external_id]': payload.external_id
    })

    expect(benefits.length).toBeGreaterThan(0)
    const filterBenefits: Benefit[] = benefits.filter((benefit) => benefit.id === benefitResponse.data.id)
    expect(filterBenefits.length).toBe(1)
    const targetBenefit = filterBenefits[0]
    expect(targetBenefit.definition.id).toBe(payload.benefit_definition_id)
    expect(targetBenefit.profile_id).toBe(payload.profile_id)
    expect(targetBenefit.issued_at).toBe(payload.issued_at)
    expect(targetBenefit.timezone).toBe(payload.timezone)
  })
})

afterAll(async () => {
  if (CREATED_BENEFITS_IDS.length > 0) {
    for (const id of CREATED_BENEFITS_IDS) {
      console.log('Cleaning up SDK Benefit with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Benefit ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_BENEFIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_BENEFIT_DEFINITION_IDS) {
      console.log('Cleaning up SDK Benefit Definition with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Benefit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
