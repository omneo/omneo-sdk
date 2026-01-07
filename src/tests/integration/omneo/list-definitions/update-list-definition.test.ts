import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition } from '@types'
import { simpleOmneoRequest, getRandomString } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_LIST_DEFINITION_IDS: number[] = []

describe('Update List Definition', () => {
  test('SDK Update List Definition', async () => {
    const payload = {
      name: getRandomString('sdk_unit_test_update_list_definition'),
      handle: getRandomString('sdk_unit_test_update_list_definition'),
      type: 'gift_registry',
      is_published: true,
      short_description: getRandomString('sdk_unit_test_update_short_desc'),
      description: getRandomString('sdk_unit_test_update_long_desc'),
      allow_quantity: true,
      allow_reserve: true,
      allow_custom_product: true,
      is_active: true
    }
    const response = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    CREATED_LIST_DEFINITION_IDS.push(response.data.id)

    const payload2 = {
      name: getRandomString('sdk_unit_test_update_list_definition2'),
      type: 'gift_registry',
      is_published: false,
      short_description: getRandomString('sdk_unit_test_update_short_desc2'),
      description: getRandomString('sdk_unit_test_update_long_desc2'),
      allow_quantity: false,
      allow_reserve: false,
      allow_custom_product: false,
      is_active: false
    }
    const listDefinitionsRes: ListDefinition = await omneoClient.listDefinitions.update(response.data.id, payload2)
    expect(listDefinitionsRes).toBeDefined()
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionsRes.id)
    expect(listDefinitionsRes).toBeDefined()
    const targetDefinition = listDefinitionsRes
    expect(targetDefinition.name).toBe(payload2.name)
    expect(targetDefinition.handle).toBe(payload.handle)
    expect(targetDefinition.type).toBe(payload2.type)
    expect(targetDefinition.is_published).toBe(payload2.is_published)
    expect(targetDefinition.short_description).toBe(payload2.short_description)
    expect(targetDefinition.description).toBe(payload2.description)
    expect(targetDefinition.allow_quantity).toBe(payload2.allow_quantity)
    expect(targetDefinition.allow_reserve).toBe(payload2.allow_reserve)
    expect(targetDefinition.allow_custom_product).toBe(payload2.allow_custom_product)
    expect(targetDefinition.is_active).toBe(payload2.is_active)
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
