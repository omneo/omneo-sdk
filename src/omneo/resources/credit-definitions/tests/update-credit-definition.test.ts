import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { CreditDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_CREDIT_DEFINITION_IDS: number[] = []

describe('Update Credit Definition', () => {
  test('SDK Update Credit Definition', async () => {
    const payload = {
      name: getRandomString('sdk_name_for_update_credit_definition'),
      handle: getRandomString('sdk_handle_for_update_credit_definition'),
      is_published: true,
      type: 'gift_card',
      timezone: 'Australia/Sydney',
      period: 20,
      period_type: 'days',
      release_period: 23,
      release_period_type: 'days',
      short_description: 'sdk_short_desc_for_update_credit_definition',
      description: 'sdk_desc_for_update_credit_definition',
      long_description: 'sdk_long_desc_for_update_credit_definition',
      value: 100
    }
    const response = await simpleOmneoRequest('POST', '/credits/definitions', payload)
    CREATED_CREDIT_DEFINITION_IDS.push(response.data.id)

    const payload2 = {
      name: getRandomString('sdk_name_for_update_credit_definition_updated'),
      period: 10,
      period_type: 'weeks',
      release_period: 13,
      release_period_type: 'weeks',
      short_description: 'sdk_short_desc_for_update_credit_definition_updated',
      description: 'sdk_desc_for_update_credit_definition_updated',
      long_description: 'sdk_long_desc_for_update_credit_definition_updated',
      value: 120
    }
    const creditDefinition: CreditDefinition = await omneoClient.creditDefinitions.update(response.data.id, payload2 as any)

    expect(creditDefinition).toBeDefined()
    const targetDefinition: CreditDefinition = creditDefinition
    expect(targetDefinition.handle).toBe(payload.handle)
    expect(targetDefinition.type).toBe(payload.type)
    expect(targetDefinition.is_published).toBe(payload.is_published)
    expect(targetDefinition.timezone).toBe(payload.timezone)
    expect(targetDefinition.name).toBe(payload2.name)
    expect(targetDefinition.short_description).toBe(payload2.short_description)
    expect(targetDefinition.description).toBe(payload2.description)
    expect(targetDefinition.period).toBe(payload2.period)
    expect(targetDefinition.period_type).toBe(payload2.period_type)
    expect(targetDefinition.release_period).toBe(payload2.release_period)
    expect(targetDefinition.release_period_type).toBe(payload2.release_period_type)
    expect(targetDefinition.short_description).toBe(payload2.short_description)
    expect(targetDefinition.long_description).toBe(payload2.long_description)
    expect(targetDefinition.value).toBe(payload2.value)
  })
})

afterAll(async () => {
  if (CREATED_CREDIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_CREDIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Update Credit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
