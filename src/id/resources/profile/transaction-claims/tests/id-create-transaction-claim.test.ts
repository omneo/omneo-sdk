import { describe, expect, afterAll } from 'vitest'
import { CreateTransactionInput, TransactionClaim, ClaimTransactionInput } from '@types'
import { getRandomString, simpleOmneoRequest } from '@lib'
import { ID } from '@id'
import { testWithIDData } from '@id-tests/test-with-id-data'
const CREATED_TRANSACTION_IDS : number[] = []
const CREATED_TRANSACTION_CLAIM_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('ID Profile Transaction claim create', () => {
  testWithIDData('ID SDK Create Transaction claim', async ({ IDData }) => {
    const { profile, tokenData } = IDData
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const payload: CreateTransactionInput = {
      profile_id: profile.id,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: getRandomString('ID_sdk_unit_Profile_Transaction_claim_create_item'),
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
      console.error('ID SDK create transaction claim, transaction created failed:', err)
      throw new Error('ID SDK create transaction claim, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    const claimInput: ClaimTransactionInput = {
      transaction_transacted_at: nowDateString.split(' ')[0],
      transaction_location_external_code: payload.location_id,
      transaction_receipt_ref: response.data.id,
      transaction_total: payload.total,
      transaction_timezone: payload.timezone,
      profile_id: payload.profile_id
    }

    const claimRes: TransactionClaim = await IDClient.profile.transactionClaims.create(claimInput)
    CREATED_TRANSACTION_CLAIM_IDS.push(claimRes.id)

    expect(claimRes.profile_id).toBe(profile.id)
    expect(claimRes.transaction_total).toBe(claimInput.transaction_total)
    expect(claimRes.transaction_timezone).toBe(claimInput.transaction_timezone)
    expect(claimRes.transaction_receipt_ref).toBe(claimInput.transaction_receipt_ref)
    expect(claimRes.transaction_location_external_code).toBe(claimInput.transaction_location_external_code)
    expect(claimRes.id).toBeDefined()
  })
})

afterAll(async () => {
  if (CREATED_TRANSACTION_CLAIM_IDS.length > 0) {
    for (const id of CREATED_TRANSACTION_CLAIM_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/transactions/claims/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`ID SDK Transaction Claim ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Transaction Claim ID ${id}`, deleteResponse)
      }
    }
  }

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
