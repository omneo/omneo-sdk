import type { AnyJsonRecord } from '../common'

export type RequestClaimBenefit = {
  definition: string
  external_id?: string | null
  meta?: AnyJsonRecord | null
  timezone: string
}

export type RequestRedeemBenefit = {
  count?: number
}

export type RedeemStrategyBenefitsItem = {
  handle?: string | null
  id?: number | null
  quantity?: number | null
}
