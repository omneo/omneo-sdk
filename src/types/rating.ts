import { PaginationResponse } from './pagination'

export type Rating = {
  id: number
  profile_id: string
  source: string | null
  product_id: number | null
  product_variant_id: number | null
  transaction_id: number | null
  interaction_id: number | null
  staff_id: string | null
  external_id: string | null
  status: string | null
  score_type: string | null
  score: number | null
  namespace: string | null
  title: string | null
  comment: string | null
  reason: string | null
  is_public: boolean
  is_active: boolean
  requires_action: boolean
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type RatingStatus = 'offered' | 'declined' | 'received'

export type RatingScoreType =
  | 'csat1'
  | 'csat2'
  | 'csat3'
  | 'csat4'
  | 'csat5'
  | 'csat6'
  | 'csat7'
  | 'csat8'
  | 'csat9'
  | 'csat10'
  | 'nps'

export type RatingSource =
  | 'product'
  | 'staff'
  | 'product_variant'
  | 'transaction'
  | 'interaction'
  | 'external'

export type CreateRatingInput = {
  profile_id: string
  source: RatingSource
  product_id?: number
  staff_id?: string
  product_variant_id?: number
  transaction_id?: number
  interaction_id?: number
  external_id?: string
  status: RatingStatus
  score_type: RatingScoreType
  score: number
  namespace?: string | null
  title?: string | null
  comment?: string | null
  reason?: string | null
  requires_action: boolean
  meta?: { [key: string]: any } | null
  is_public?: boolean | null
  is_active?: boolean | null
}

type UpdateRatingEditable = Pick<
  CreateRatingInput,
  | 'status'
  | 'score_type'
  | 'score'
  | 'namespace'
  | 'title'
  | 'comment'
  | 'reason'
  | 'requires_action'
  | 'meta'
  | 'is_public'
  | 'is_active'
>

export type UpdateRatingInput = Partial<UpdateRatingEditable>

export type RatingResponse = PaginationResponse & {
  data: Rating[]
}
