import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { BenefitInput } from '../../../../types'
import { getRandomString } from './util'
import randomString from '../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : number[] = []
const CREATED_BENEFITS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Benefits update', async () => {
  const payload = {
    name: getRandomString('sdk_unit_test_benefit_update'),
    handle: getRandomString('sdk_unit_test_benefit_update'),
    period: 30
  }
  const { data: definition } = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
    console.error('SDK create benefit definition failed:', err)
    throw new Error('SDK create benefit definition failed')
  })

  CREATED_BENEFIT_DEFINITION_IDS.push(definition.id)

  test('SDK Update Benefits', async () => {
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

    const updatedBenefit = await omneo.benefits.update(benefitResponse.data.id, {
      external_id: `${payload.external_id}-updated`,
      expires_at: '2024-12-01'
    })

    expect(updatedBenefit.external_id).toBe(`${payload.external_id}-updated`)
    expect(updatedBenefit.expires_at).toBe('2024-12-01 00:00:00')
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
