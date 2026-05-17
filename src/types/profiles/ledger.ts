import type { FilterOperator } from '../common'
import type { Benefit } from '../benefits'
import type { Order } from '../orders'
import type { Point } from '../points'
import type { Reward } from '../rewards'
import type { Transaction } from '../transactions'

export type RequestQueryLedger = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    dollar_value?: string | FilterOperator
    dollar_balance?: string | FilterOperator
    point_value?: string | FilterOperator
    point_balance?: string | FilterOperator
    point_dollar_value?: string | FilterOperator
    expires_at?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
}

export type LedgerProfile = {
  id: number
  email: string
}

export type Ledger = {
  description: string | null
  dollar_balance: number | null
  dollar_value: number | null
  expires_at: string | null
  id: number
  point_balance: number | null
  point_dollar_value: number | null
  point_value: number | null
  profile: LedgerProfile
  type: string | null
  type_attributes: Order | Transaction | Benefit | Point | Reward | null
}

export type LedgerResponse = {
  data: Ledger[]
}
