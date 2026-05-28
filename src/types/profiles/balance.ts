import type { Currency } from '../currencies'
export type RequestProfileBalance = {
  currency?: string
}

export type ProfileBalancesLocalised = {
  reward_balance: number
  point_balance_dollars: number
  combined_balance_dollars: number
}

export type ProfileBalances = {
  benefit_balance: number
  combined_balance_dollars: number
  credit_balance: number
  currency: Currency | null
  localised: ProfileBalancesLocalised
  point_balance: number
  point_balance_dollars: number
  reward_balance: number
}

export type Balance = ProfileBalances
