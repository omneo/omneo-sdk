import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { TransactionInput, TransactionProductVariantsResponse } from '../../../../../types'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TRANSACTION_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('Profile Transaction products list', () => {
  test('SDK Profile Transaction products list', async () => {
    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const prevDateString = new Date(new Date().getTime() - 1000).toISOString().replace('T', ' ').slice(0, 19)

    const payload: TransactionInput = {
      profile_id: testProfileID,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'Profile Transaction products list items',
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
      console.error('SDK list transactions created failed:', err)
      throw new Error('SDK list transactions created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    const productsRes: TransactionProductVariantsResponse = await omneo.profiles.transactionProducts(testProfileID, {
      'filter[transacted_at]': prevDateString
    })
    const { data: products } = productsRes
    expect(products.length).toBeGreaterThan(0)
    const mappingProducts = products.map(({ id }) => {
      return { id }
    })
    expect(mappingProducts).toContainEqual({
      id: parseInt(testProductVariantId)
    })
  })
})

afterAll(async () => {
  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const id of CREATED_TRANSACTION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Transaction ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Transaction ID ${id}`, deleteResponse)
      }
    }
  }
})
