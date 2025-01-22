import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { BenefitInput } from '../../../../types'
import { getRandomString } from '../../../lib/string/util'
import randomString from '../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : string[] = []
const CREATED_BENEFITS_IDS : number[] = []

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Benefit created', async () => {
  const payload = {
    name: getRandomString('sdk_unit_test_benefit_create'),
    handle: getRandomString('sdk_unit_test_benefit_create'),
    period: 30
  }
  const { data: definition } = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
    console.error('SDK create benefit definition failed:', err)
    throw new Error('SDK create benefit definition failed')
  })

  CREATED_BENEFIT_DEFINITION_IDS.push(definition.id)

  test('SDK created Benefit', async () => {
    const payload: BenefitInput = {
      profile_id: testProfileID,
      benefit_definition_id: definition.id,
      external_id: randomString(10),
      expires_at: '2024-12-06',
      issued_at: '2024-12-06 08:30:00',
      timezone: 'Australia/Melbourne'
    }

    const createdBenefit = await omneo.benefits.create(payload).catch((e) => {
      console.error('Failed to create benefit', e)
      throw new Error(e)
    })
    CREATED_BENEFITS_IDS.push(createdBenefit.id)

    expect(createdBenefit.profile_id).toBe(payload.profile_id)
    expect(createdBenefit.definition.id).toBe(payload.benefit_definition_id)
    expect(createdBenefit.external_id).toBe(payload.external_id)
    expect(createdBenefit.expires_at).toBe(`${payload.expires_at} 00:00:00`)
    expect(createdBenefit.issued_at).toBe(payload.issued_at)
    expect(createdBenefit.timezone).toBe(payload.timezone)
  })

  afterAll(async () => {
    if (CREATED_BENEFITS_IDS.length > 0) {
      for (const id of CREATED_BENEFITS_IDS) {
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
        const deleteResponse = await simpleOmneoRequest('DELETE', `/benefits/definitions/${id}`)
        if (deleteResponse.status === 204) {
          console.log(`SDK Benefit Definition ID ${id} deleted`)
        } else {
          console.log(`Failed to delete Benefit Definition ID ${id}`, deleteResponse)
        }
      }
    }
  })
})
