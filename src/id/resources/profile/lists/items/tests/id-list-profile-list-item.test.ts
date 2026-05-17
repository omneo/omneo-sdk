import { describe, expect, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, List, ListItem } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'

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
describe('ID List Profile List Items', () => {
  testWithIDData('ID SDK List Profile List Items', async ({ IDData }) => {
    const { tokenData } = IDData
    // Create List Definition
    const payload = {
      name: getRandomString('id_sdk_list_definition_name_for_list_list_items'),
      handle: getRandomString('id_sdk_list_definition_handle_for_list_list_items'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true,
      allow_custom_product: true
    }
    const response: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', payload)
    const listDefinitionId = response.data.id
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionId)

    // Create List
    const payload2 = {
      list_definition_id: listDefinitionId,
      name: getRandomString('id_sdk_list_name_for_list_list_items')
    }
    const response2: {data: List } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, payload2)
    const listId = response2.data.id
    CREATED_LIST_IDS.push(listId)

    // Create List Item
    const product = await omneoClient.products.get(testProductId)
    const payload3 = {
      product_variant_id: +testProductVariantId,
      product_id: +testProductId,
      external_id: product.external_id,
      quantity: +3,
      status: 'remaining'
    }
    const response3: { data: ListItem } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists/${listId}/items`, payload3)
    const listItemId = response3.data.id
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const listItems = await IDClient.profile.lists.items.list(listId).catch((err: any) => {
      console.error('ID SDK List profile list items failed:', err)
      throw new Error('ID SDK List profile list items failed')
    })
    CREATED_LIST_ITEM_IDS.push({
      listId,
      itemId: listItemId
    })
    const listItem = listItems.data.find((item) => item.id === listItemId)
    expect(listItem).toBeDefined()
    expect(listItem!.product_list_id).toBe(listId)
    expect(listItem!.product_variant.id).toBe(payload3.product_variant_id)
    expect(listItem!.product.id).toBe(payload3.product_id)
    expect(listItem!.product.external_id).toBe(payload3.external_id)
    expect(listItem!.quantity).toBe(payload3.quantity)
    expect(listItem!.status).toBe(payload3.status)
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
      console.log('Cleaning up ID SDK List with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List ID ${id}`, deleteResponse)
      }
    }
  }
  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      console.log('Cleaning up ID SDK List Definition with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK List Definition ID ${id} deleted`)
      } else {
        console.log(`Failed to delete List Definition ID ${id}`, deleteResponse)
      }
    }
  }
})
