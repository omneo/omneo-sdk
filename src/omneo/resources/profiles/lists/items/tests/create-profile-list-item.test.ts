import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, ProductList } from '@types'
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
describe('Create Profile List Item', () => {
  test('SDK Create Profile List Item', async () => {
    // Create List Definition
    const payload = {
      name: getRandomString('sdk_list_definition_for_create_list_item'),
      handle: getRandomString('sdk_list_definition_for_create_list_item'),
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
      name: getRandomString('sdk_list_name_for_create_list_item')
    }
    const response2: { data: ProductList } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    CREATED_LIST_IDS.push(response2.data.id)

    const product = await omneoClient.products.get(testProductId)
    // Create List Item
    const payload3 = {
      product_variant_id: +testProductVariantId,
      product_id: +testProductId,
      external_id: product.external_id,
      quantity: +3,
      status: 'remaining'
    }
    const listId = response2.data.id
    const listItem = await omneoClient.profiles.lists.items.create(testProfileID, listId, payload3 as any).catch((err: any) => {
      console.error('SDK Create profile list item failed:', err)
      throw new Error('SDK Create profile list item failed')
    })
    CREATED_LIST_ITEM_IDS.push({
      listId,
      itemId: listItem.id
    })
    expect(listItem).toBeDefined()
    expect(listItem.product_list_id).toBe(listId)
    expect(listItem.product_variant.id).toBe(payload3.product_variant_id)
    expect(listItem.product!.id).toBe(payload3.product_id)
    expect(listItem.product!.external_id).toBe(payload3.external_id)
    expect(listItem.quantity).toBe(payload3.quantity)
    expect(listItem.status).toBe(payload3.status)
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
