import { describe, expect, afterAll } from 'vitest'
import { CreateTransactionInput, Transaction } from '@types'
import { simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'
import { getRandomDigitString } from '@/tests/lib/string/util'

const CREATED_TRANSACTION_IDS: number[] = []
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('ID Profile Unattach Transaction', () => {
  testWithIDData('ID SDK Unattach Transaction', async ({ IDData }) => {
    const { profile, tokenData } = IDData
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)

    // Create transaction
    const payload: CreateTransactionInput = {
      profile_id: profile.id,
      total: 49.99,
      receipt_ref: getRandomDigitString(16),
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'ID Unattach Transaction Test Product',
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
      console.error('ID SDK unattach transaction, transaction created failed:', err)
      throw new Error('ID SDK unattach transaction, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    // Test unattach
    const unattachedTransaction: Transaction = await IDClient.profile.transactions.unattach(response.data.id)

    expect(unattachedTransaction).toBeDefined()
    expect(unattachedTransaction.id).toBe(response.data.id)
    expect(unattachedTransaction.profile_id).toBeNull()

    const claimTransactionInput = {
      profile_id: profile.id,
      transaction_receipt_ref: payload.receipt_ref!,
      transaction_timezone: payload.timezone,
      transaction_total: payload.total,
      transaction_transacted_at: payload.transacted_at.split(' ')[0]
    }
    const claimResponse = await simpleOmneoRequest('POST', `/profiles/${profile.id}/transactions/claims`, claimTransactionInput)
    expect(claimResponse.data.profile_id).toBe(profile.id)
  })
})

afterAll(async () => {
  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const id of CREATED_TRANSACTION_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Transaction ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Transaction ID ${id}`, deleteResponse)
      }
    }
  }
})
