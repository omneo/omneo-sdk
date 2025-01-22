import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { BenefitInput } from '../../../../../types'
import { getRandomString } from '../../../../lib/string/util'
import randomString from '../../../../lib/string/random'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_BENEFIT_DEFINITION_IDS : number[] = []
const CREATED_BENEFITS_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Profile Benefits', async () => {
  const payload = {
    name: getRandomString('sdk_unit_test_profile_benefit_get'),
    handle: getRandomString('sdk_unit_test_profile_benefit_get'),
    period: 30,
    is_extendable: true
  }
  const { data: definition } = await simpleOmneoRequest('POST', '/benefits/definitions', payload).catch((err) => {
    console.error('SDK create benefit definition failed:', err)
    throw new Error('SDK create benefit definition failed')
  })

  CREATED_BENEFIT_DEFINITION_IDS.push(definition.id)

  test('SDK Get a profile benefit ', async () => {
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

    const fetchedBenefit = await omneo.profiles.benefits.get(testProfileID, benefit.id)

    expect(fetchedBenefit.id).toEqual(benefit.id)
  })

  test('SDK Delete a profile benefit', async () => {
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

    await omneo.profiles.benefits.delete(testProfileID, benefit.id)
    const fetchedBenefit = await simpleOmneoRequest('GET', `/benefits/${benefit.id}`)
    expect(fetchedBenefit).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })

  test('SDK Update a profile benefit', async () => {
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
    const updatedExternalID = randomString(10)
    const updatedBenefit = await omneo.profiles.benefits.update(testProfileID, benefit.id, { external_id: updatedExternalID })

    expect(updatedBenefit.external_id).toEqual(updatedExternalID)
    expect(updatedBenefit.id).toEqual(benefit.id)
  })

  test('SDK Redeem a profile benefit', async () => {
    const payload: BenefitInput = {
      profile_id: testProfileID,
      benefit_definition_id: definition.id,
      external_id: randomString(10),
      expires_at: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      issued_at: '2024-12-06 08:30:00',
      timezone: 'Australia/Melbourne'
    }

    const { data: benefit } = await simpleOmneoRequest('POST', '/benefits', payload).catch((err) => {
      console.error('SDK list benefits created failed:', err)
      throw new Error('SDK list benefits created failed')
    })

    CREATED_BENEFITS_IDS.push(benefit.id)

    const redeemedBenefit = await omneo.profiles.benefits.redeem(testProfileID, benefit.id)
    expect(redeemedBenefit.profile_id).toEqual(testProfileID)
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
