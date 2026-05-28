// Route category: redemptions

import type { FilterOperator, AnyJsonRecord, ExternalIdNullableRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { RedemptionProfile } from './profiles'
import type { Benefit } from './benefits'
import type { Credit } from './credits'
import type { Currency } from './currencies'
import type { Point } from './points'
import type { Balance } from './profiles/balance'
import type { Reward } from './rewards'

export type RequestReturnBenefit = {
  count?: number
}

export type RequestQueryRedemption = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    type?: string | FilterOperator
    location_id?: string | FilterOperator
    meta?: string | FilterOperator
    external_id?: string | FilterOperator
    exchange_rate?: string | FilterOperator
    redeem_at?: string | FilterOperator
    has_benefit?: string | FilterOperator
    has_reward?: string | FilterOperator
    has_point?: string | FilterOperator
    has_credit?: string | FilterOperator
    transaction_external_id?: string | FilterOperator
    transaction_receipt_ref?: string | FilterOperator
    profile_id?: string | FilterOperator
    created_at?: string | FilterOperator
    updated_at?: string | FilterOperator
    linked_source_id?: string | FilterOperator
    linked_source_type?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
  [key: string]: any
}

export type RequestQueryRedemptionItem = {
  offset?: number
  limit?: number
  filter?: {
    redemption_id?: string | FilterOperator
    redemption?: {
      redeem_at?: string | FilterOperator
    }
    redeemable_type?: string | FilterOperator
    created_at?: string | FilterOperator
    external_id?: string | FilterOperator
    value?: string | FilterOperator
    linked_profile_id?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
  [key: string]: any
}

export type RedemptionLocation = {
  id: number
  type: string | null
  name: string | null
  description: string | null
  phone: string | null
  email: string | null
  external_id: string | null
  is_published: boolean
  is_permanently_closed: boolean
}

export type RedemptionTransaction = {
  external_id: string | null
  receipt_ref: string | null
  transacted_at: string | null
  total: number | null
  location: ExternalIdNullableRecord | null
}

export type RedemptionItemTypeEnum = 'reward' | 'point' | 'benefit' | 'credit'

export type SuccessfulRedemptionLocation = {
  id: number
  type: string | null
  name: string | null
  description: string | null
  phone: string | null
  email: string | null
  external_id: string | null
  is_published: boolean
  is_permanently_closed: boolean
}

export type RedemptionItem = {
  count: number | null
  created_at: string
  id: number
  type: RedemptionItemTypeEnum | null
  type_attributes: Credit | Benefit | Point | Reward | null
  updated_at: string
  value: number | null
}

export type SuccessfulRedemption = {
  balances: Balance
  created_at: string
  currency: Currency | null
  id: number
  location: SuccessfulRedemptionLocation | null
  location_id: number
  meta: AnyJsonRecord | null
  profile_id: string
  total: number | null
  total_localised: number | null
  transaction_external_id: string
  transaction_receipt_ref: string | null
  updated_at: string
}

export type RedemptionItemResponse = {
  data: RedemptionItem[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Redemption = {
  created_at: string
  id: number
  items: RedemptionItem[]
  location: RedemptionLocation | null
  location_id: number
  meta: AnyJsonRecord | null
  profile: RedemptionProfile
  profile_id: string
  redeem_at: string | null
  total: number | null
  total_localised: number | null
  transaction: RedemptionTransaction | null
  transaction_id: number
  type: 'redeem' | 'return' | 'reversal' | null
  updated_at: string
}

export type RedemptionResponse = {
  data: Redemption[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type RedemptionGroupByItem = Record<string, any> & {
  redemptions: {
    data: Redemption[]
  }
}

export type RedemptionGroupByResponse = {
  current_page: number
  data: RedemptionGroupByItem[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}
