import { afterEach, expect, test } from 'vitest'
import {writeTransactionWithVariant, writeTransactionWithVariantID} from '../../mocks/transactions/transaction'
import simpleOmneoRequest from '../../lib/simple-omneo-request'
import { Omneo } from '../../../omneo'
import randomString from '../../lib/string/random'

const CREATED_TRANSACTION_IDS : number[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

test('SDK can write a transaction with a variant to Omneo.', async () => {
  writeTransactionWithVariant.external_id = randomString(9)

  const sdkCreateTransaction = await omneo.transactions.updateCreate(writeTransactionWithVariant)

  expect(sdkCreateTransaction.external_id).toBe(writeTransactionWithVariant.external_id)
  expect(sdkCreateTransaction.tags).toStrictEqual(writeTransactionWithVariant.tags)
  expect(sdkCreateTransaction.receipt_ref).toStrictEqual(writeTransactionWithVariant.receipt_ref)
  CREATED_TRANSACTION_IDS.push(sdkCreateTransaction.id)
})

test('SDK can write a transaction with a variant ID Omneo.', async () => {
  writeTransactionWithVariantID.external_id = randomString(9)

  const sdkCreateTransaction = await omneo.transactions.updateCreate(writeTransactionWithVariantID)

  expect(sdkCreateTransaction.external_id).toBe(writeTransactionWithVariantID.external_id)
  expect(sdkCreateTransaction.tags).toStrictEqual(writeTransactionWithVariantID.tags)
  expect(sdkCreateTransaction.receipt_ref).toStrictEqual(writeTransactionWithVariantID.receipt_ref)
  CREATED_TRANSACTION_IDS.push(sdkCreateTransaction.id)
})

afterEach(async () => {
  // Delete the test transaction.
  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const transactionId of CREATED_TRANSACTION_IDS) {
      console.log('Cleaning up transaction', transactionId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${transactionId}`)
      if (deleteResponse.status === 204) {
        console.log(`Transaction ${transactionId} deleted`)
      }
    }
  }
})
