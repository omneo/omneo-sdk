import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinitionResponse } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_LIST_DEFINITION_IDS: number[] = []

describe('List Definition List', () => {
  test('SDK List Definition List', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_list_definition_list'),
      handle: getRandomString('sdk_unit_test_list_definition_list'),
      type: 'gift_registry',
      is_published: true,
      short_description: getRandomString('sdk_unit_test_short_desc'),
      description: getRandomString('sdk_unit_test_long_desc'),
      allow_quantity: true,
      allow_reserve: true,
      allow_custom_product: true,
      is_active: true
    }
    const response = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    CREATED_LIST_DEFINITION_IDS.push(response.data.id)

    const listDefinitionsRes: ListDefinitionResponse = await omneoClient.listDefinitions.list({
      'filter[handle]': payload.handle
    })
    const { data: listDefinitions } = listDefinitionsRes
    expect(listDefinitions.length).toBeGreaterThan(0)

    const targetDefinition = listDefinitions[0]
    expect(targetDefinition.name).toBe(payload.name)
    expect(targetDefinition.handle).toBe(payload.handle)
    expect(targetDefinition.type).toBe(payload.type)
    expect(targetDefinition.is_published).toBe(payload.is_published)
    expect(targetDefinition.short_description).toBe(payload.short_description)
    expect(targetDefinition.description).toBe(payload.description)
    expect(targetDefinition.allow_quantity).toBe(payload.allow_quantity)
    expect(targetDefinition.allow_reserve).toBe(payload.allow_reserve)
    expect(targetDefinition.allow_custom_product).toBe(payload.allow_custom_product)
    expect(targetDefinition.is_active).toBe(payload.is_active)
  })
})

afterAll(async () => {
  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
