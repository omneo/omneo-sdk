import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '@omneo'
import { Transaction } from '@types'
import { simpleOmneoRequest } from '@lib'
import { getRandomDigitString } from '@/tests/lib/string/util'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TRANSACTION_IDS: number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('Profile Unattach Transaction', () => {
  test('SDK Profile Unattach Transaction', async () => {
    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)

    // Create transaction
    const payload = {
      profile_id: testProfileID,
      total: 49.99,
      receipt_ref: getRandomDigitString(16),
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'Unattach Transaction Test Product',
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
      console.error('SDK unattach transaction, transaction created failed:', err)
      throw new Error('SDK unattach transaction, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    // Test unattach
    const unattachedTransaction: Transaction = await omneoClient.profiles.transactions.unattach(
      testProfileID,
      response.data.id
    )

    expect(unattachedTransaction).toBeDefined()
    expect(unattachedTransaction.id).toBe(response.data.id)
    expect(unattachedTransaction.profile_id).toBeNull()

    const claimTransactionInput = {
      profile_id: testProfileID,
      transaction_receipt_ref: payload.receipt_ref!,
      transaction_timezone: payload.timezone,
      transaction_total: payload.total,
      transaction_transacted_at: payload.transacted_at.split(' ')[0]
    }
    const claimResponse = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/transactions/claims`, claimTransactionInput)
    expect(claimResponse.data.profile_id).toBe(testProfileID)
  })
})

afterAll(async () => {
  // Unattch transaction couldn't be deleted.
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
