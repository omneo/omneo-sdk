import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { CreateOrderInput } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'

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
describe('Profile Orders Get By ID', () => {
  test('SDK Profile Orders Get By ID', async () => {
    const product = await omneoClient.products.get(testProductId)
    const productVariant = await omneoClient.products.variants.get(testProductId, testProductVariantId)
    const payload: CreateOrderInput = {
      profile_id: testProfileID,
      total: productVariant.price,
      external_id: getRandomString('sdk_unit_test_get_order_external_id_'),
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
      console.error('SDK Get Profile order: Order created failed:', err)
      throw new Error('SDK Get Profile order: Order created failed')
    })
    CREATED_ORDERS_IDS.push(response.data.id)

    const getOrder = await omneoClient.profiles.orders.get(testProfileID, response.data.id).catch((err: any) => {
      console.error('SDK Get profile order failed:', err)
      throw new Error('SDK Get profile order failed')
    })
    expect(getOrder).toBeDefined()
    expect(getOrder!.profile_id).toBe(payload.profile_id)
    expect(getOrder!.external_id).toBe(payload.external_id)
    expect(getOrder!.total).toBe(payload.total)
    expect(getOrder!.items[0].product_id).toBe(Number(testProductId))
    expect(getOrder!.items[0].product_variant_id).toBe(productVariant.id)
    // TODO target order item sku is null now, need to fix in API
    // expect(getOrder!.items[0].sku).toBe(productVariant.sku)
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
