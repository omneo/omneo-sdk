import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { CreditDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_CREDIT_DEFINITION_IDS: number[] = []

describe('Get Credit Definition', () => {
  test('SDK Get Credit Definition', async () => {
    const payload = {
      name: getRandomString('sdk_name_for_get_credit_definition'),
      handle: getRandomString('sdk_handle_for_get_credit_definition'),
      is_published: true,
      type: 'gift_card',
      timezone: 'Australia/Sydney',
      period: 20,
      period_type: 'days',
      release_period: 23,
      release_period_type: 'days',
      short_description: 'sdk_short_desc_for_get_credit_definition',
      description: 'sdk_desc_for_get_credit_definition',
      long_description: 'sdk_long_desc_for_get_credit_definition',
      value: 100
    }
    const response = await simpleOmneoRequest('POST', '/credits/definitions', payload)
    CREATED_CREDIT_DEFINITION_IDS.push(response.data.id)

    const creditDefinitionsRes: CreditDefinition = await omneoClient.creditDefinitions.get(response.data.id)
    expect(creditDefinitionsRes).toBeDefined()

    const targetDefinition = creditDefinitionsRes
    expect(targetDefinition.name).toBe(payload.name)
    expect(targetDefinition.handle).toBe(payload.handle)
    expect(targetDefinition.type).toBe(payload.type)
    expect(targetDefinition.is_published).toBe(payload.is_published)
    expect(targetDefinition.short_description).toBe(payload.short_description)
    expect(targetDefinition.description).toBe(payload.description)
    expect(targetDefinition.timezone).toBe(payload.timezone)
    expect(targetDefinition.period).toBe(payload.period)
    expect(targetDefinition.period_type).toBe(payload.period_type)
    expect(targetDefinition.release_period).toBe(payload.release_period)
    expect(targetDefinition.release_period_type).toBe(payload.release_period_type)
    expect(targetDefinition.short_description).toBe(payload.short_description)
    expect(targetDefinition.long_description).toBe(payload.long_description)
    expect(targetDefinition.value).toBe(payload.value)
  })
})

afterAll(async () => {
  if (CREATED_CREDIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_CREDIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Get Credit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
