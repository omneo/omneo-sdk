import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, ProductList, TransactionItemResponse } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TRANSACTION_IDS: number[] = []
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('Profile Get Unassigned and Assigned Transaction Items', () => {
  test('SDK Profile Get Unassigned and Assigned Transaction Items', async () => {
    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)

    // Create List Definition
    const listDefPayload = {
      name: getRandomString('sdk_test_list_def_assigned_items'),
      handle: getRandomString('sdk_test_list_def_assigned_items_handle'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true,
      allow_custom_product: true
    }
    const listDefResponse: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', listDefPayload)
    CREATED_LIST_DEFINITION_IDS.push(listDefResponse.data.id)

    // Create List
    const listPayload = {
      list_definition_id: listDefResponse.data.id,
      name: getRandomString('sdk_test_list_assigned_items')
    }
    const listResponse: { data: ProductList } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, listPayload)
    CREATED_LIST_IDS.push(listResponse.data.id)

    // Create transaction
    const payload = {
      profile_id: testProfileID,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'Get Assigned Transaction Items Test Product',
          price_current: 49.99,
          price_sell: 49.99,
          quantity: 1
        }
      ],
      timezone: 'UTC',
      transacted_at: nowDateString,
      location_id: testLocationId
    }
    const response = await simpleOmneoRequest('POST', '/transactions', payload).catch((err) => {
      console.error('SDK get assigned items, transaction created failed:', err)
      throw new Error('SDK get assigned items, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)
    const transactionItem = response.data.items[0]

    // Test getUnassignedItems
    const unassignedItemsRes: TransactionItemResponse = await omneoClient.profiles.transactions.getUnassignedItems(testProfileID, {
      include_list_item: 1
    })

    expect(unassignedItemsRes).toBeDefined()
    expect(Array.isArray(unassignedItemsRes.data)).toBe(true)
    expect(unassignedItemsRes.data.length).toBeGreaterThan(0)

    // Create List Item
    const listItemPayload = {
      product_variant_id: parseInt(testProductVariantId),
      quantity: 1
    }
    const createdListItem = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists/${listResponse.data.id}/items`, listItemPayload).catch((err) => {
      console.error('SDK link/unlink list item, list item created failed:', err)
      throw new Error('SDK link/unlink list item, list item created failed')
    })

    // Create list item linked to transaction item
    const linkListItemPayload = {
      product_list_item_id: createdListItem.data.id,
      type: 'link'
    }
    await simpleOmneoRequest('POST', `/profiles/${testProfileID}/transactions/items/${transactionItem.id}/list-item`, linkListItemPayload)
    const assignedItemsRes: TransactionItemResponse = await omneoClient.profiles.transactions.getAssignedItems(testProfileID, {
      include_list_item: 1
    })

    expect(assignedItemsRes).toBeDefined()
    expect(Array.isArray(assignedItemsRes.data)).toBe(true)
    expect(assignedItemsRes.data.length).toBeGreaterThan(0)
  })
})

afterAll(async () => {
  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Assigned Items List ID ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Assigned Items List Definition ID ${id} deleted`)
      }
    }
  }

  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const id of CREATED_TRANSACTION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Transaction ID ${id} deleted`)
      }
    }
  }
})
