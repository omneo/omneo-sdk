import { describe, expect, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { CreateOrderInput, GroupOrderResponse } from '@types'
import { testWithIDData } from '@id-tests/test-with-id-data'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_ORDERS_IDS: number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductId = process.env.OMNEO_TEST_PRODUCT_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string

beforeAll(() => {
  process.env.TZ = 'Australia/Melbourne'
})

describe('ID Profile List Group orders', () => {
  testWithIDData('ID SDK List Group orders', async ({ IDData }) => {
    const { tokenData } = IDData
    const product = await omneoClient.products.get(testProductId)
    const productVariant = await omneoClient.products.variants.get(testProductId, testProductVariantId)
    const payload: CreateOrderInput = {
      profile_id: testProfileID,
      total: productVariant.price,
      external_id: getRandomString('sdk_unit_test_list_order_external_id_'),
      order_number: getRandomString('sdk_unit_test_list_order_order_number_'),
      transacted_at: '2026-01-04 00:00:00',
      timezone: 'Australia/Melbourne',
      items: [
        {
          name: product.title,
          quantity: 1,
          price_sell: productVariant.price,
          product_variant: {
            product_id: Number(testProductId),
            sku: productVariant.sku,
            title: productVariant.title,
            category: 'test category',
            brand: product.brand,
            price: productVariant.price
          }
        }
      ]
    }
    const response = await simpleOmneoRequest('POST', '/orders', payload).catch((err) => {
      console.error('SDK List Group orders: Order created failed:', err)
      throw new Error('SDK List Group orders: Order created failed')
    })
    CREATED_ORDERS_IDS.push(response.data.id)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const listOrders: GroupOrderResponse = await IDClient.profile.orders.listGroup().catch((err: any) => {
      console.error('ID SDK List Group orders failed:', err)
      throw new Error('ID SDK List Group orders failed')
    })
    expect(listOrders.data.length).toBeGreaterThan(0)
    const targetOrderFromList = listOrders.data.find((order) => order.order_number === payload.order_number)
    expect(targetOrderFromList).toBeDefined()
    expect(targetOrderFromList!.order_number).toBe(payload.order_number)
    expect(targetOrderFromList!.total).toBe(payload.total)
    expect(targetOrderFromList!.orders[0].profile_id).toBe(payload.profile_id)
    expect(targetOrderFromList!.orders[0].external_id).toBe(payload.external_id)
    expect(targetOrderFromList!.orders[0].items[0].product_id).toBe(Number(testProductId))
    expect(targetOrderFromList!.orders[0].items[0].product_variant_id).toBe(productVariant.id)
  })
})

afterAll(async () => {
  if (CREATED_ORDERS_IDS.length > 0) {
    for (const id of CREATED_ORDERS_IDS) {
      console.log('Cleaning up SDK Order with ID', id)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/orders/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Order ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Order ID ${id}`, deleteResponse)
      }
    }
  }
})
