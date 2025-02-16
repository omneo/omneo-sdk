
import { TransactionInput, TransactionClaim } from '../../../../../types'
import { describe, expect, afterAll } from 'vitest'
import { ID } from '../../../../../id'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { testWithIDData } from '../../test-with-id-data'

const CREATED_TRANSACTION_IDS : number[] = []
const CREATED_TRANSACTION_CLAIM_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('ID Profile Transaction claims list', () => {
  testWithIDData('ID SDK Profile Transaction claims list', async ({ IDData }) => {
    const { tokenData } = IDData
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const payload: TransactionInput = {
      profile_id: testProfileID,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'ID Profile Transaction claims list',
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
      console.error('ID SDK list transaction claims, transaction created failed:', err)
      throw new Error('ID SDK list transaction claims, transaction created failed')
    })
    CREATED_TRANSACTION_IDS.push(response.data.id)

    const payload2 = {
      transaction_transacted_at: nowDateString.split(' ')[0],
      transaction_location_external_code: payload.location_id,
      transaction_receipt_ref: response.data.id,
      transaction_total: payload.total,
      transaction_timezone: payload.timezone,
      profile_id: payload.profile_id
    }
    const response2 = await simpleOmneoRequest('POST', `/profiles/${testProfileID}/transactions/claims`, payload2).catch((err) => {
      console.error('ID SDK list transaction claims, claim created failed:', err)
      throw new Error('ID SDK list transaction claims, claim created failed')
    })
    CREATED_TRANSACTION_CLAIM_IDS.push(response2.data.id)

    const claimsRes: TransactionClaim = await IDClient.profile.transactionClaims.get(response2.data.id)
    expect(claimsRes.profile_id).toBe(testProfileID)
    expect(claimsRes.transaction_total).toBe(`${payload2.transaction_total}`)
    expect(claimsRes.transaction_timezone).toBe(payload2.transaction_timezone)
    expect(claimsRes.transaction_receipt_ref).toBe(`${payload2.transaction_receipt_ref}`)
    expect(claimsRes.transaction_location_external_code).toBe(payload2.transaction_location_external_code)
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

  // TODO uncomment this once the delete api supported
  if (CREATED_TRANSACTION_CLAIM_IDS.length > 0) {
    // for (const id of CREATED_TRANSACTION_CLAIM_IDS) {
    //   const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/transactions/claims/${id}`)
    //   if (deleteResponse.status === 204) {
    //     console.log(`SDK Transaction claim ID ${id} deleted`)
    //   } else {
    //     console.log(`Failed to delete Transaction claim ID ${id}`, deleteResponse)
    //   }
    // }
  }
})
