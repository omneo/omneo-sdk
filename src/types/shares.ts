// Route category: shares

import type { AnyJsonRecord, AnyRecord, FilterOperator, PeriodType } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestClaimShare = {
  code: string
  meta?: AnyJsonRecord | null
  profile_id: string
}

export type RequestCreateShare = {
  absolute_expiry?: string | null
  code?: string | null
  expires_at?: string | null
  is_cloneable?: boolean
  meta?: AnyJsonRecord | null
  period?: number | null
  period_type?: PeriodType | null
  profile_id: string
  quantity?: '1'
  remaining_quantity?: number | null
  source_id: number
  source_type: 'profile' | 'product' | 'transaction' | 'reward' | 'benefit' | 'point' | 'user' | 'tenant' | 'list' | 'listItem' | 'target' | 'automation' | 'trigger' | 'aggregation' | 'comms_attribute' | 'appearance_attribute' | 'webhook' | 'identity' | 'tier' | 'address' | 'location' | 'product_variant' | 'benefit_definition' | 'reward_definition' | 'tier_definition' | 'transaction_item' | 'order' | 'redemption' | 'tier_point' | 'interaction' | 'status' | 'organisation' | 'role_definition' | 'credit_definition' | 'credit' | 'product_list_reservation' | 'appointment_definition' | 'appointment' | 'question' | 'questionnaire' | 'questionnaire_answer' | 'questionnaire_submission' | 'rating' | 'custom_attribute' | 'connection'
  timezone?: string | null
}

export type RequestUpdateShare = {
  absolute_expiry?: string | null
  code?: string | null
  expires_at?: string | null
  meta?: AnyJsonRecord | null
  period?: number | null
  period_type?: PeriodType | null
}

export type RequestQueryShare = {
  offset?: number
  limit?: number
  filter?: {
    profile_id?: string | FilterOperator
    source_id?: string | FilterOperator
    source_type?: string | FilterOperator
    handle?: string | FilterOperator
    timezone?: string | FilterOperator
    period?: string | FilterOperator
    period_type?: string | FilterOperator
    absolute_expiry?: string | FilterOperator
    code?: string | FilterOperator
    expires_at?: string | FilterOperator
    remaining_quantity?: string | FilterOperator
    meta?: string | FilterOperator
    is_cloneable?: string | FilterOperator
    quantity?: string | FilterOperator
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
}

export type Share = {
  absolute_expiry: string | null
  code: string | null
  created_at: string | null
  expires_at: string | null
  handle: string | null
  id: number
  is_cloneable: boolean
  meta: AnyRecord | null
  period: number | null
  period_type: PeriodType
  profile_id: string
  quantity: number | null
  remaining_quantity: number | null
  source: AnyJsonRecord | null
  source_id: number
  source_type: string
  timezone: string | null
  updated_at: string | null
}

export type ShareClaim = {
  claimed_at: string | null
  created_at: string | null
  created_source: string | null
  created_source_id: number
  created_source_type: string | null
  id: number
  is_cloned: boolean
  meta: AnyJsonRecord | null
  profile_id: string
  share_id: number
  share_profile_id: string | null
  updated_at: string | null
}

export type ShareResponse = {
  data: Share[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type ShareClaimResponse = {
  data: ShareClaim[]
}
