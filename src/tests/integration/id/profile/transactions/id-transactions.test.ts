import { describe, expect, test } from 'vitest'
import simpleOmneoRequest from '../../../../lib/simple-omneo-request'
import simpleIDRequest from '../../../../lib/simple-id-request'
import { ID } from '../../../../..'

describe('ID transactions', async () => {
  const allTransactions = await simpleOmneoRequest('GET', '/transactions').then(({ data }) => data)
  const transaction = allTransactions.find((txn: any) => txn.profile_id && txn.external_id)
  const tokenData = await simpleIDRequest('POST', 'auth/token', process.env.OMNEO_TOKEN, { id: transaction.profile_id })
    .then(({ data }) => data)

  const IDClient = new ID({
    tenant: process.env.OMNEO_TENANT as string,
    omneoAPIToken: process.env.OMNEO_TOKEN as string,
    IDToken: tokenData.token,
    IDTokenExpiry: tokenData.exp
  })

  test('ID transactions can find transactions', async () => {
    const foundTransaction = await IDClient.profile.transactions.find({ field: 'external_id', value: transaction.external_id })
    expect(foundTransaction?.id).toBe(transaction.id)
  })

  test('ID SDK can get grouped transactions', async () => {
    const { data: groupedTrans } = await IDClient.profile.transactions.getGrouped()
    expect(Array.isArray(groupedTrans)).toBe(true)
    expect(groupedTrans.length).toBeGreaterThanOrEqual(1)
  })
})
