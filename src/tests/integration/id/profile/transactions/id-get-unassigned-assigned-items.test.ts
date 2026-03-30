import { describe, expect, afterAll } from 'vitest'
import { CreateTransactionInput, TransactionAssignedItemsResponse, ListDefinition, List, TransactionUnassignedItemsResponse } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_TRANSACTION_IDS: number[] = []
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('ID Profile Get Unassigned and Assigned Transaction Items', () => {
  testWithIDData.skip('ID SDK Get Unassigned and Assigned Transaction Items', async ({ IDData }) => {
    const { profile, tokenData } = IDData
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)

    // Create List Definition
    const listDefPayload = {
      name: getRandomString('id_sdk_test_list_def_assigned_items'),
      handle: getRandomString('id_sdk_test_list_def_assigned_items_handle'),
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
      name: getRandomString('id_sdk_test_list_assigned_items')
    }
    const listResponse: { data: List } = await simpleOmneoRequest('POST', `/profiles/${profile.id}/lists`, listPayload)
    CREATED_LIST_IDS.push(listResponse.data.id)

    // Create transaction
    const payload: CreateTransactionInput = {
      profile_id: profile.id,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: getRandomString('ID_sdk_unit_Get_Assigned_Transaction_Items_Test_Product'),
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
      console.error('ID SDK get assigned items, transaction created failed:', err)
      throw new Error('ID SDK get assigned items, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    const transactionItem = response.data.items[0]

    // Test getUnassignedItems
    const unassignedItemsRes: TransactionUnassignedItemsResponse = await IDClient.profile.transactions.getUnassignedItems({
      include_list_item: 1
    })

    expect(unassignedItemsRes).toBeDefined()
    expect(Array.isArray(unassignedItemsRes.data)).toBe(true)
    expect(unassignedItemsRes.data.length).toBeGreaterThan(0)

    // Create list item linked to transaction item
    const listItemPayload = {
      product_list_item_id: listResponse.data.id,
      type: 'link'
    }
    const transactionItemId = transactionItem.id
    await simpleOmneoRequest('POST', `/profiles/${profile.id}/transactions/items/${transactionItemId}/list-item`, listItemPayload)
    // Test getAssignedItems
    const assignedItemsRes: TransactionAssignedItemsResponse = await IDClient.profile.transactions.getAssignedItems({
      include_list_item: 1
    })

    expect(assignedItemsRes).toBeDefined()
    expect(Array.isArray(assignedItemsRes.data)).toBe(true)
    expect(assignedItemsRes.data.length).toBeGreaterThan(0)

    const targetItem = assignedItemsRes.data.find((item: any) => item.id === transactionItem.id)
    expect(targetItem).toBeDefined()
    const payloadTargetItem = payload.items[0]
    expect(targetItem?.product_variant_id).toBe(payloadTargetItem.product_variant_id)
    expect(targetItem?.name).toBe(payloadTargetItem.name)
    expect(targetItem?.price_current).toBe(payloadTargetItem.price_current)
    expect(targetItem?.price_sell).toBe(payloadTargetItem.price_sell)
    expect(targetItem?.quantity).toBe(payloadTargetItem.quantity)
  })
})

afterAll(async () => {
  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Assigned Items List ID ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Assigned Items List Definition ID ${id} deleted`)
      }
    }
  }

  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const id of CREATED_TRANSACTION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Transaction ID ${id} deleted`)
      }
    }
  }
})
