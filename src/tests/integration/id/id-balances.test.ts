import { describe, expect } from 'vitest'
import { ID } from '../../../id'
import { testWithIDData } from './test-with-id-data'

describe('ID balances', () => {
  testWithIDData('ID SDK can get balances', async ({ IDData }) => {
    const { tokenData } = IDData
    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })
    const balances = await IDClient.profile.getBalances()

    expect(typeof balances.reward_balance).toBe('number')
    expect(typeof balances.point_balance).toBe('number')
    expect(typeof balances.point_balance_dollars).toBe('number')
    expect(typeof balances.benefit_balance).toBe('number')
    expect(typeof balances.combined_balance_dollars).toBe('number')
  })
})
