import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, ProductList } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Search Lists', () => {
  test('SDK Search Lists', async () => {
    // Create List Definition
    const definitionPayload = {
      name: getRandomString('sdk_list_definition_for_search_list'),
      handle: getRandomString('sdk_list_definition_for_search_list'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true,
      allow_custom_product: true
    }
    const definitionResponse: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', definitionPayload)
    const listDefinitionId = definitionResponse.data.id
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionId)

    // Create List
    const listPayload = {
      list_definition_id: listDefinitionId,
      name: getRandomString('sdk_list_name_for_search_list')
    }
    const listResponse: { data: ProductList } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, listPayload)
    const listId = listResponse.data.id
    CREATED_LIST_IDS.push(listId)

    // Search by list name
    const params = {
      'page[size]': 10,
      'filter[search_with][name]': listPayload.name
    }

    const response = await omneoClient.lists.search(params as any).catch((err: any) => {
      console.error('SDK Search Lists failed:', err)
      throw new Error('SDK Search Lists failed')
    })

    expect(response).toBeDefined()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    const found = response.data.find((list) => list.id === listId)
    expect(found).toBeDefined()
    expect(found?.name).toBe(listPayload.name)
  })
})

afterAll(async () => {
  for (const listId of CREATED_LIST_IDS) {
    const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}`)
    if (deleteResponse?.status === 204) {
      console.log(`SDK List ID ${listId} deleted`)
    } else {
      console.log(`Failed to delete List ID ${listId}`, deleteResponse)
    }
  }
  for (const id of CREATED_LIST_DEFINITION_IDS) {
    const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
    if (deleteResponse?.status === 204) {
      console.log(`SDK List Definition ID ${id} deleted`)
    } else {
      console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
    }
  }
})
