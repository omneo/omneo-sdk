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
const FAILED_DELETED_BENEFIT_IDS : number[] = []

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Benefit deleted', async () => {
  const payload = {
    name: getRandomString('sdk_unit_test_benefit_delete'),
    handle: getRandomString('sdk_unit_test_benefit_delete'),
    period: 30
  }
  const { data: definition } = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
    console.error('SDK create benefit definition failed:', err)
    throw new Error('SDK create benefit definition failed')
  })

  CREATED_BENEFIT_DEFINITION_IDS.push(definition.id)

  test('SDK delete benefit', async () => {
    const payload: BenefitInput = {
      profile_id: testProfileID,
      benefit_definition_id: definition.id,
      external_id: randomString(10),
      expires_at: '2024-12-06',
      issued_at: '2024-12-06 08:30:00',
      timezone: 'Australia/Melbourne'
    }

    const { data: benefit } = await simpleOmneoRequest('POST', '/benefits', payload).catch((e) => {
      console.error('Failed to create benefit', e)
      throw new Error(e)
    })

    await omneo.benefits.delete(benefit.id).catch((err) => {
      console.error(`SDK Benefit delete failed with id:${benefit.id}`, err)
      FAILED_DELETED_BENEFIT_IDS.push(benefit.id)
      throw new Error(`SDK Benefit definition delete failed with id: ${benefit.id}`)
    })
    const benefitResponse = await simpleOmneoRequest('GET', `/benefits/${benefit.id}`)
    expect(benefitResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })

  afterAll(async () => {
    if (FAILED_DELETED_BENEFIT_IDS.length > 0) {
      for (const id of FAILED_DELETED_BENEFIT_IDS) {
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
