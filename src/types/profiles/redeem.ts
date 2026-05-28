import type { AnyJsonRecord } from '../common'
import type { RedeemStrategyBenefitsItem } from './benefit'

export type RequestRedeemCredit = {
  amount: number
  location_id?: number | null
  meta?: AnyJsonRecord | null
  security_code?: string | null
  transaction_external_id?: string | null
  transaction_receipt_ref?: string | null
}

export type RedeemStrategyStrategiesEnum = 'points' | 'rewards' | 'benefits' | 'credits'

export type RequestRedeemStrategy = {
  amount?: number | null
  benefits?: RedeemStrategyBenefitsItem[] | null
  currency?: string
  location_id?: number | null
  meta?: AnyJsonRecord | null
  strategies?: RedeemStrategyStrategiesEnum[]
  strict?: boolean
  transaction_external_id?: string | null
  transaction_receipt_ref?: string | null
}
