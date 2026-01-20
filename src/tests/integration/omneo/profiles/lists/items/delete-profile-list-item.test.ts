import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, List, ListItem } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const CREATED_LIST_ITEM_IDS: any[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductId = process.env.OMNEO_TEST_PRODUCT_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string

beforeAll(() => {
  process.env.TZ = 'Australia/Melbourne'
})
describe('Delete Profile List Item', () => {
  test('SDK Delete Profile List Item', async () => {
    // Create List Definition
    const payload = {
      name: getRandomString('sdk_list_definition_for_delete_list_item'),
      handle: getRandomString('sdk_list_definition_for_delete_list_item'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true
    }
    const response: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    const listDefinitionId = response.data.id
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionId)

    // Create List
    const payload2 = {
      list_definition_id: listDefinitionId,
      name: getRandomString('sdk_list_name_for_delete_list_item')
    }
    const response2: { data: List } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    CREATED_LIST_IDS.push(response2.data.id)

    const product = await omneoClient.products.get(testProductId)
    // Create List Item
    const payload3 = {
      product_variant_id: +testProductVariantId,
      product_id: +testProductId,
      external_id: product.external_id,
      quantity: 5,
      status: 'remaining'
    }
    const listId = response2.data.id
    const response3: { data: ListItem } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists/${listId}/items`, payload3)
    const listItemId = response3.data.id

    await omneoClient.profiles.lists.items.delete(testProfileID, listId, listItemId).catch((err: any) => {
      console.error('SDK Delete profile list item failed:', err)
      CREATED_LIST_ITEM_IDS.push({
        listId,
        itemId: listItemId
      })
      throw new Error('SDK Delete profile list item failed')
    })
    expect(response3.data).toBeDefined()
    expect(response3.data.product_list_id).toBe(listId)
    expect(response3.data.product_variant.id).toBe(payload3.product_variant_id)
    expect(response3.data.product.id).toBe(payload3.product_id)
    expect(response3.data.product.external_id).toBe(payload3.external_id)

    const listItemResponse = await simpleOmneoRequest('GET', `/profiles/${testProfileID}/lists/${listId}/items/${listItemId}`)
    expect(listItemResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
  })
})

afterAll(async () => {
  if (CREATED_LIST_ITEM_IDS.length > 0) {
    for (const { itemId, listId } of CREATED_LIST_ITEM_IDS) {
      console.log('Cleaning up SDK Create Item with ID', itemId, 'in List ID', listId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}/items/${itemId}`)
      if (deleteResponse?.data?.length === 0) {
        console.log(`SDK Create Item with ID ${itemId} deleted`)
      } else {
        console.log(`Failed to delete Create Item with ID ${itemId}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      console.log('Cleaning up SDK List with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      console.log('Cleaning up SDK List Definition with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK List Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
