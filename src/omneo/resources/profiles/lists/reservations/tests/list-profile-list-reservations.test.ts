import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { ListDefinition, ProductList, ProductListItem, ProductListReservation } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const CREATED_LIST_DEFINITION_IDS: number[] = []
const CREATED_LIST_IDS: number[] = []
const CREATED_LIST_ITEMS: Array<{ listId: number, itemId: number }> = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductId = process.env.OMNEO_TEST_PRODUCT_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string

describe('List Profile List Reservations', () => {
  test.skip('SDK List Profile List Reservations', async () => {
    const listDefinitionPayload = {
      name: getRandomString('sdk_list_definition_for_list_reservations'),
      handle: getRandomString('sdk_list_definition_for_list_reservations'),
      type: 'gift_registry',
      is_published: true,
      allow_quantity: true,
      allow_reserve: true
    }

    const listDefinitionResponse: { data: ListDefinition } = await simpleOmneoRequest('POST', '/lists/definitions', listDefinitionPayload)
    const listDefinitionId = listDefinitionResponse.data.id
    CREATED_LIST_DEFINITION_IDS.push(listDefinitionId)

    const listPayload = {
      list_definition_id: listDefinitionId,
      name: getRandomString('sdk_list_for_list_reservations')
    }

    const listResponse: { data: ProductList } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists`, listPayload)
    const listId = listResponse.data.id
    CREATED_LIST_IDS.push(listId)

    const product = await omneoClient.products.get(testProductId)
    const listItemPayload = {
      product_variant_id: +testProductVariantId,
      product_id: +testProductId,
      external_id: product.external_id,
      quantity: 1,
      status: 'remaining'
    }

    const listItemResponse: { data: ProductListItem } = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/lists/${listId}/items`, listItemPayload)
    const listItemId = listItemResponse.data.id
    CREATED_LIST_ITEMS.push({ listId, itemId: listItemId })

    const reservationPayload = {
      profile_id: testProfileID,
      quantity: 1,
      timezone: 'Australia/Melbourne'
    }

    const reservationResponse: { data: ProductListReservation } = await simpleOmneoRequest('POST', `/list/items/${listItemId}/reservations`, reservationPayload)
    const reservationId = reservationResponse.data.id

    const reservations = await omneoClient.profiles.lists.reservations.list(testProfileID).catch((err: any) => {
      console.error('SDK List profile list reservations failed:', err)
      throw new Error('SDK List profile list reservations failed')
    })

    const reservation = reservations.find((item) => item.id === reservationId)
    expect(reservation).toBeDefined()
    expect(reservation!.id).toBe(reservationId)
    expect(reservation!.profile!.id).toBe(testProfileID)
    expect(reservation!.product_list_item_id).toBe(listItemId)
  })
})

afterAll(async () => {
  if (CREATED_LIST_ITEMS.length > 0) {
    for (const { itemId, listId } of CREATED_LIST_ITEMS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${listId}/items/${itemId}`)
      if (deleteResponse?.data?.length === 0) {
        console.log(`SDK reservation list item ${itemId} deleted`)
      }
    }
  }

  if (CREATED_LIST_IDS.length > 0) {
    for (const id of CREATED_LIST_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/lists/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK reservation list ${id} deleted`)
      }
    }
  }

  if (CREATED_LIST_DEFINITION_IDS.length > 0) {
    for (const id of CREATED_LIST_DEFINITION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/lists/definitions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK reservation list definition ${id} deleted`)
      }
    }
  }
})
