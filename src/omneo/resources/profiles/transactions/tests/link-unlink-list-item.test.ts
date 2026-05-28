import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { TransactionItem, ListDefinition, ProductList } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TRANSACTION_IDS: number[] = []
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const CREATED_LIST_ITEMS: { listId: number; itemId: number }[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('Profile Link and Unlink Transaction Item', () => {
  test('SDK Profile Link and Unlink List Item', async () => {
    const nowDateString = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19)
    // Create transaction
    const payload = {
      profile_id: testProfileID,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'Link Unlink Transaction Item Test Product',
          price_current: 49.99,
          price_sell: 49.99,
          quantity: 1
        }
      ],
      timezone: 'Australia/Melbourne',
      transacted_at: nowDateString,
      location_id: testLocationId
    }
    const response = await simpleOmneoRequest('POST', '/transactions', payload).catch((err) => {
      console.error('SDK link/unlink list item, transaction created failed:', err)
      throw new Error('SDK link/unlink list item, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    // Create List Definition
    const listDefPayload = {
      name: getRandomString('sdk_test_list_def_link_unlink'),
      handle: getRandomString('sdk_test_list_def_link_unlink_handle'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true,
      allow_reserve: true,
      is_active: true,
      allow_edit: true,
      allow_custom_product: true
    }
    const listDefResponse: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', listDefPayload)
    CREATED_LIST_DEFINITION_IDS.push(listDefResponse.data.id)

    // Create List
    const listPayload = {
      list_definition_id: listDefResponse.data.id,
      name: getRandomString('sdk_test_list_link_unlink')
    }
    const listResponse: { data: ProductList } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, listPayload)
    CREATED_LIST_IDS.push(listResponse.data.id)
    const transactionItem = response.data.items[0]

    // Create List Item
    const listItemPayload = {
      product_variant_id: parseInt(testProductVariantId),
      quantity: 1
    }
    const createdListItem = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists/${listResponse.data.id}/items`, listItemPayload).catch((err) => {
      console.error('SDK link/unlink list item, list item created failed:', err)
      throw new Error('SDK link/unlink list item, list item created failed')
    })
    CREATED_LIST_ITEMS.push({ listId: listResponse.data.id, itemId: createdListItem.data.id })

    const linkedItem: TransactionItem = await omneoClient.profiles.transactions.linkListItem(
      testProfileID,
      transactionItem.id,
      createdListItem.data.id
    )
    expect(linkedItem).toBeDefined()
    expect(linkedItem.id).toBe(transactionItem.id)

    // Test unlinkListItem
    const unlinkedItem: TransactionItem = await omneoClient.profiles.transactions.unlinkListItem(
      testProfileID,
      transactionItem.id,
      createdListItem.data.id
    )

    expect(unlinkedItem).toBeDefined()
    expect(unlinkedItem.id).toBe(transactionItem.id)
  })
})

afterAll(async () => {
  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const id of CREATED_TRANSACTION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Transaction ID ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_ITEMS.length > 0) {
    for (const { listId, itemId } of CREATED_LIST_ITEMS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}/items/${itemId}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Link/Unlink List Item ID ${itemId} deleted`)
      }
    }
  }

  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Link/Unlink List ID ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Link/Unlink List Definition ID ${id} deleted`)
      }
    }
  }
})
