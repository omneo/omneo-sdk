
import { describe, expect, test, afterAll } from 'vitest'
import { Omneo } from '../../../../../omneo'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import { TransactionInput } from '../../../../../types'

const omneoClient = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})
const CREATED_TRANSACTION_IDS : number[] = []
const FAILED_DELETE_TRANSACTION_CLAIM_IDS : number[] = []
const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string
const testProductVariantId = process.env.OMNEO_TEST_PRODUCT_VARIANT_ID as string
const testLocationId = process.env.OMNEO_TEST_LOCATION_ID as string

describe('Profile Transaction claims delete', () => {
  test('SDK Profile Transaction claims delete', async () => {
    const nowDateString = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const payload: TransactionInput = {
      profile_id: testProfileID,
      total: 49.99,
      items: [
        {
          product_variant_id: parseInt(testProductVariantId),
          name: 'Profile Transaction claim delete item',
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
      console.error('SDK delete transaction claim, transaction created failed:', err)
      throw new Error('SDK delete transaction claim, transaction created failed')
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
      console.error('SDK delete transaction claim created transaction failed:', err)
      throw new Error('SDK delete transaction claim created transaction failed')
    })

    await omneoClient.profiles.transactionClaims.delete(testProfileID, response2.data.id).catch((err) => {
      console.error(`SDK delete transaction claim failed with id:${response2.data.id}`, err)
      FAILED_DELETE_TRANSACTION_CLAIM_IDS.push(response2.data.id)
      throw new Error(`SDK delete transaction claim failed with id:${response2.data.id}`)
    })

    const claimResponse = await simpleOmneoRequest('GET', `/profiles/${testProfileID}/transactions/claims/${response2.data.id}`)
    expect(claimResponse).toEqual(expect.objectContaining({ status: 404, statusText: 'Not Found' }))
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

  if (FAILED_DELETE_TRANSACTION_CLAIM_IDS.length > 0) {
    for (const id of FAILED_DELETE_TRANSACTION_CLAIM_IDS) {
      const deleteResponse = await simpleOmneoRequest('DELETE', `/profiles/${testProfileID}/transactions/claims/${id}`)
      if (deleteResponse.status === 204) {
        console.log(`SDK Transaction claim ID ${id} deleted`)
      } else {
        console.log(`Failed to delete Transaction claim ID ${id}`, deleteResponse)
      }
    }
  }
})
