import { describe, test, afterAll, beforeEach, expect } from 'vitest'
import simpleOmneoRequest from '../../lib/simple-omneo-request'
import { ID } from '../../../id'
import jwt from 'jsonwebtoken'

const IDClient = new ID({
  tenant: process.env.OMNEO_TENANT as string,
  config: {},
  omneoAPIToken: process.env.OMNEO_TOKEN as string
})

describe('ID Class Tests', async () => {
  const exampleProfile = await simpleOmneoRequest('GET', '/profiles').then(({ data }) => data[0])

  test('ID SDK can be reset', async () => {
    IDClient.IDToken = 'TEST123'
    IDClient.IDTokenExp = 12345
    IDClient.reset()
    expect(IDClient.IDToken).toBe('')
    expect(IDClient.IDTokenExp).toBeUndefined()
  })

  test('ID SDK can request an auth token with profile id', async () => {
    const { token, exp } = await IDClient.auth.requestAuthToken({ id: exampleProfile.id })
    const { pid: decodedProfileID, exp: decodedExpiry } = jwt.decode(token)
    expect(typeof token).toBe('string')
    expect(typeof exp).toBe('number')
    expect(exp).toBeGreaterThan(Math.floor(Date.now() / 1000))

    expect(decodedProfileID).toBe(exampleProfile.id)
    expect(decodedExpiry).toBe(exp)
  })

  test('ID SDK can request an anonymous auth token', async () => {
    const { token, exp } = await IDClient.auth.requestAuthToken({ id: '' })
    const { pid: decodedProfileID, exp: decodedExpiry } = jwt.decode(token)
    expect(typeof token).toBe('string')
    expect(typeof exp).toBe('number')
    expect(exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
    expect(decodedExpiry).toBe(exp)
    expect(decodedProfileID).toBe('null') // API returns the string null
  })

  test('ID SDK can get me', async () => {
    const { token } = await IDClient.auth.requestAuthToken({ id: exampleProfile.id })
    const { data: profile } = await IDClient.profile.me()
    const { pid: decodedProfileID } = jwt.decode(token)

    expect(profile.id).toBe(decodedProfileID)
    expect(typeof profile.email).toBe('string')
  })

  test('ID SDK can get aggregations', async () => {
    const { token } = await IDClient.auth.requestAuthToken({ id: exampleProfile.id })
    const aggregations = await IDClient.profile.getAggregations()
    const { pid: decodedProfileID } = jwt.decode(token)

    expect(aggregations.profile_id).toBe(decodedProfileID)
    expect(aggregations.shop_days).toBeDefined()
  })

  test('ID SDK can calculate aggregations', async () => {
    const { token } = await IDClient.auth.requestAuthToken({ id: exampleProfile.id })
    const aggregations = await IDClient.profile.calculateAggregations()
    const { pid: decodedProfileID } = jwt.decode(token)

    expect(aggregations.profile_id).toBe(decodedProfileID)
    expect(aggregations.shop_days).toBeDefined()
  })

  test('ID SDK can get balances', async () => {
    await IDClient.auth.requestAuthToken({ id: exampleProfile.id })
    const balances = await IDClient.profile.getBalances()

    expect(typeof balances.reward_balance).toBe('number')
    expect(typeof balances.point_balance).toBe('number')
    expect(typeof balances.point_balance_dollars).toBe('number')
    expect(typeof balances.benefit_balance).toBe('number')
    expect(typeof balances.combined_balance_dollars).toBe('number')
  })

  test('ID SDK can find transactions', async () => {
    const allTransactions = await simpleOmneoRequest('GET', '/transactions').then(({ data }) => data)
    const transaction = allTransactions.find((txn: any) => txn.profile_id && txn.external_id)

    await IDClient.auth.requestAuthToken({ id: transaction.profile_id })
    const foundTransaction = await IDClient.profile.findTransactions({ field: 'external_id', value: transaction.external_id })
    expect(foundTransaction?.id).toBe(transaction.id)
  })

  test('ID SDK can get grouped transactions', async () => {
    const allTransactions = await simpleOmneoRequest('GET', '/transactions').then(({ data }) => data)
    const transaction = allTransactions.find((txn: any) => txn.profile_id && txn.external_id)

    await IDClient.auth.requestAuthToken({ id: transaction.profile_id })
    const { data: groupedTrans } = await IDClient.profile.getGroupedTransactions()
    expect(Array.isArray(groupedTrans)).toBe(true)
    expect(groupedTrans.length).toBeGreaterThanOrEqual(1)
  })

  test('ID SDK cannot get me with anon token', async () => {
    await IDClient.auth.requestAuthToken({ id: '' })
    await expect(IDClient.profile.me()).rejects.toThrow(expect.objectContaining({ status: 404, ok: false }))
  })
})

beforeEach(async () => {
  IDClient.reset()
})

afterAll(async () => {
  // Delete the test transaction.
//   if (CREATED_TRANSACTION_IDS.length > 0) {
//     for (const transactionId of CREATED_TRANSACTION_IDS) {
//       console.log('Cleaning up transaction', transactionId)
//       const deleteResponse = await simpleOmneoRequest('DELETE', `/transactions/${transactionId}`)
//       if (deleteResponse.status === 204) {
//         console.log(`Transaction ${transactionId} deleted`)
//       }
//     }
//   }
})
