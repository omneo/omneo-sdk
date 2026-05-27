// Route category: ratings

import type { FilterOperator, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RatingStatusEnum = 'offered' | 'declined' | 'received'

export type RatingScoreTypeEnum = 'csat1' | 'csat2' | 'csat3' | 'csat4' | 'csat5' | 'csat6' | 'csat7' | 'csat8' | 'csat9' | 'csat10' | 'nps'

export type RatingSource = | 'product'
  | 'staff'
  | 'product_variant'
  | 'transaction'
  | 'interaction'
  | 'external'

export type RequestQueryRating = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    product_id?: string | FilterOperator
    product_variant_id?: string | FilterOperator
    interaction_id?: string | FilterOperator
    staff_id?: string | FilterOperator
    location_id?: string | FilterOperator
    source?: string | FilterOperator
    status?: string | FilterOperator
    score_type?: string | FilterOperator
    score?: string | FilterOperator
    namespace?: string | FilterOperator
    title?: string | FilterOperator
    comment?: string | FilterOperator
    reason?: string | FilterOperator
    requires_action?: string | FilterOperator
    is_public?: string | FilterOperator
    is_active?: string | FilterOperator
    transaction_id?: string | FilterOperator
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

export type RequestUpdateRating = {
  comment?: string | null
  is_active?: boolean | null
  is_public?: boolean | null
  meta?: AnyRecord | null
  namespace?: string | null
  reason?: string | null
  requires_action?: boolean
  score?: number
  score_type?: RatingScoreTypeEnum
  status?: RatingStatusEnum
  title?: string | null
}

export type RequestCreateRating = {
  comment?: string | null
  external_id?: string | null
  interaction_id?: number | null
  is_active?: boolean | null
  is_public?: boolean | null
  meta?: AnyRecord | null
  namespace?: string | null
  product_id?: number | null
  product_variant_id?: number | null
  profile_id: string
  reason?: string | null
  requires_action: boolean
  score: number
  score_type: RatingScoreTypeEnum
  source: RatingSource
  staff_id?: string | null
  status: RatingStatusEnum
  title?: string | null
  transaction_id?: number | null
}

export type Rating = {
  comment: string | null
  created_at: string
  external_id: string
  id: number
  interaction_id: number
  is_active: boolean
  is_public: boolean
  meta: AnyRecord | null
  namespace: string | null
  product_id: number
  product_variant_id: number
  profile_id: string
  reason: string | null
  requires_action: boolean
  score: number
  score_type: RatingScoreTypeEnum
  source: RatingSource
  staff_id: string | null
  status: RatingStatusEnum
  title: string | null
  transaction_id: number
  updated_at: string
}

export type RatingResponse = {
  data: Rating[]
  meta?: PaginationMeta
  links?: PaginationLink
}
