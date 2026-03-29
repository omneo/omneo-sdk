import { describe, expect, afterAll } from 'vitest'
import { CreateTransactionInput, TransactionItem, ListDefinition, List } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_TRANSACTION_IDS: number[] = []
const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('ID Profile Link and Unlink Transaction Item', () => {
  testWithIDData('ID SDK Link and Unlink List Item', async ({ IDData }) => {
    const { profile, tokenData } = IDData
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const nowDateString = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19)

    // Create List Definition
    const listDefPayload = {
      name: getRandomString('id_sdk_test_list_def_link_unlink'),
      handle: getRandomString('id_sdk_test_list_def_link_unlink_handle'),
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
      name: getRandomString('id_sdk_test_list_link_unlink')
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
          name: 'ID Link Unlink Transaction Item Test Product',
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
      console.error('ID SDK link/unlink list item, transaction created failed:', err)
      throw new Error('ID SDK link/unlink list item, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    const transactionItem = response.data.items[0]

    // Test linkListItem
    const linkedItem: TransactionItem = await IDClient.profile.transactions.linkListItem(
      transactionItem.id,
      listResponse.data.id
    )

    expect(linkedItem).toBeDefined()
    expect(linkedItem.id).toBe(transactionItem.id)

    // Test unlinkListItem
    const unlinkedItem: TransactionItem = await IDClient.profile.transactions.unlinkListItem(
      transactionItem.id,
      listResponse.data.id
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
        console.log(`ID SDK Transaction ID ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Link/Unlink List ID ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Link/Unlink List Definition ID ${id} deleted`)
      }
    }
  }
})
