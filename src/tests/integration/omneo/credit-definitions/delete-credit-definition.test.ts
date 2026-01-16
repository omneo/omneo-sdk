import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_CREDIT_DEFINITION_IDS: number[] = []

describe('Delete Credit Definition', () => {
  test('SDK Delete Credit Definition', async () => {
    const payload = {
      name: getRandomString('sdk_name_for_delete_credit_definition'),
      handle: getRandomString('sdk_handle_for_delete_credit_definition'),
      is_published: true,
      type: 'gift_card',
      timezone: 'Australia/Sydney',
      period: 20,
      period_type: 'days',
      release_period: 23,
      release_period_type: 'days',
      short_description: 'sdk_short_desc_for_delete_credit_definition',
      description: 'sdk_desc_for_delete_credit_definition',
      long_description: 'sdk_long_desc_for_delete_credit_definition',
      value: 100
    }
    const response = await simpleOmneoRequest('POST', '/credits/definitions', payload)

    expect(response.data).toBeDefined()
    expect(response.data.name).toBe(payload.name)
    expect(response.data.handle).toBe(payload.handle)
    expect(response.data.type).toBe(payload.type)

    await omneoClient.creditDefinitions.delete(response.data.id).catch((err) => {
      console.error(`SDK Credit definition delete failed with id:${response.data.id}`, err)
      CREATED_CREDIT_DEFINITION_IDS.push(response.data.id)
      throw new Error(`SDK Credit definition delete failed with id:${response.data.id}`)
    })

    const creditDefinitionsResponse = await simpleOmneoRequest('GET', `/credits/definitions/${response.data.id}`)
    expect(creditDefinitionsResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (CREATED_CREDIT_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_CREDIT_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/credits/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Delete Credit Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Credit Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
