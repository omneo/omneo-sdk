import { describe, test, afterAll, expect } from 'vitest'
import { writeTransactionWithVariant, writeTransactionWithVariantID } from '../../../mocks/transactions/transaction'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Omneo } from '../../../../omneo'
import randomString from '../../../lib/string/random'

const CREATED_TRANSACTION_IDS : number[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Transactions update-create', () => {
  test('SDK can create a transaction with a variant to Omneo.', async () => {
    writeTransactionWithVariant.external_id = randomString(9)

    const sdkCreateTransaction = await omneo.transactions.updateCreate(writeTransactionWithVariant)
    CREATED_TRANSACTION_IDS.push(sdkCreateTransaction.id)

    expect(sdkCreateTransaction.external_id).toBe(writeTransactionWithVariant.external_id)
    expect(sdkCreateTransaction.tags).toStrictEqual(writeTransactionWithVariant.tags)
    expect(sdkCreateTransaction.receipt_ref).toStrictEqual(writeTransactionWithVariant.receipt_ref)
  })

  test('SDK can create a transaction with a variant ID Omneo.', async () => {
    writeTransactionWithVariantID.external_id = randomString(9)

    const sdkCreateTransaction = await omneo.transactions.updateCreate(writeTransactionWithVariantID)
    CREATED_TRANSACTION_IDS.push(sdkCreateTransaction.id)

    expect(sdkCreateTransaction.external_id).toBe(writeTransactionWithVariantID.external_id)
    expect(sdkCreateTransaction.tags).toStrictEqual(writeTransactionWithVariantID.tags)
    expect(sdkCreateTransaction.receipt_ref).toStrictEqual(writeTransactionWithVariantID.receipt_ref)
  })

  test('SDK can update a transaction Omneo.', async () => {
    writeTransactionWithVariantID.external_id = randomString(9)

    const testTransactionResponse = await simpleOmneoRequest('POST', '/transactions', writeTransactionWithVariantID)
    CREATED_TRANSACTION_IDS.push(testTransactionResponse.data.id)

    const newTransaction = testTransactionResponse.data

    newTransaction.meta = {
      ...newTransaction.meta,
      updated: 'updated'
    }
    newTransaction.tags = [
      ...newTransaction.tags,
      'updated'
    ]
    newTransaction.total = 200

    const sdkCreateTransaction = await omneo.transactions.updateCreate(newTransaction)
    expect(sdkCreateTransaction.tags).toStrictEqual(newTransaction.tags)
    expect(sdkCreateTransaction.total).toBe(200)
  })
})

afterAll(async () => {
  // Delete the test transaction.
  if (CREATED_TRANSACTION_IDS.length > 0) {
    for (const transactionId of CREATED_TRANSACTION_IDS) {
      console.log('Cleaning up transaction', transactionId)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${transactionId}`)
      console.log(deleteResponse, 'HERE')
      if (deleteResponse.status === 204) {
        console.log(`Transaction ${transactionId} deleted`)
      }
    }
  }
})
