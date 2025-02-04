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
const CREATED_BENEFIT_DEFINITION_IDS : number[] = []
const CREATED_BENEFITS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Benefits extend', async () => {
  const payload = {
    name: getRandomString('sdk_unit_test_benefit_extend'),
    handle: getRandomString('sdk_unit_test_benefit_extend'),
    period: 30,
    is_extendable: true
  }
  const { data: definition } = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
    console.error('SDK create benefit definition failed:', err)
    throw new Error('SDK create benefit definition failed')
  })

  CREATED_BENEFIT_DEFINITION_IDS.push(definition.id)

  test('SDK Extend a benefit with extend_date', async () => {
    const payload: BenefitInput = {
      profile_id: testProfileID,
      benefit_definition_id: definition.id,
      external_id: randomString(10),
      expires_at: '2024-12-06',
      issued_at: '2024-12-06 08:30:00',
      timezone: 'Australia/Melbourne'
    }

    const { data: benefit } = await simpleOmneoRequest('POST', '/benefits', payload).catch((err) => {
      console.error('SDK list benefits created failed:', err)
      throw new Error('SDK list benefits created failed')
    })

    CREATED_BENEFITS_IDS.push(benefit.id)

    const { data: extendedBenefits } = await omneo.benefits.extend({
      ids: [benefit.id],
      extend_date: '2025-01-01 00:00:00',
      profile_id: testProfileID
    })

    expect(extendedBenefits.length).toBe(1)
    expect(extendedBenefits[0].expires_at).toBe('2025-01-01 00:00:00')
    expect(typeof extendedBenefits[0].extended_at).toBe('string')
  })

  test('SDK Extend a benefit with extend_days', async () => {
    const payload: BenefitInput = {
      profile_id: testProfileID,
      benefit_definition_id: definition.id,
      external_id: randomString(10),
      expires_at: '2024-12-06',
      issued_at: '2024-12-06 08:30:00',
      timezone: 'Australia/Melbourne'
    }

    const { data: benefit } = await simpleOmneoRequest('POST', '/benefits', payload).catch((err) => {
      console.error('SDK list benefits created failed:', err)
      throw new Error('SDK list benefits created failed')
    })

    CREATED_BENEFITS_IDS.push(benefit.id)

    const { data: extendedBenefits } = await omneo.benefits.extend({
      ids: [benefit.id],
      extend_days: 1,
      profile_id: testProfileID
    })

    expect(extendedBenefits.length).toBe(1)
    expect(extendedBenefits[0].expires_at).toBe('2024-12-07 00:00:00')
    expect(typeof extendedBenefits[0].extended_at).toBe('string')
  })
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
