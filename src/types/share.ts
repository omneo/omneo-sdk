import { PeriodType } from './misc'
import { PaginationResponse } from './pagination'

export type Share = {
  id: number
  profile_id: string
  source_type: string | null
  source_id: number | null
  handle: string
  code: string | null
  timezone: string | null
  period: number | null
  period_type: PeriodType | null
  absolute_expiry: string | null
  expires_at: string | null
  quantity: number | null
  remaining_quantity: number | null
  meta: { [key: string]: any } | null
  is_cloneable: boolean
  source: any
  created_at: string | null
  updated_at: string | null
}

export type ShareResponse = PaginationResponse &{
  data: Share[]
}

export type CreateShareInput = {
  profile_id: Share['profile_id']
  source_id: number
  source_type: string
  code?: Share['code']
  timezone?: Share['timezone']
  period?: Share['period']
  period_type?: Share['period_type']
  absolute_expiry?: Share['absolute_expiry']
  expires_at?: Share['expires_at']
  remaining_quantity?: Share['remaining_quantity']
  quantity?: number
  meta?: Share['meta']
  is_cloneable?: Share['is_cloneable']
}

export type UpdateShareInput = Pick<
  CreateShareInput,
  'period' | 'period_type' | 'absolute_expiry' | 'code' | 'expires_at' | 'meta'
>

export type ClaimShareInput = {
  profile_id: Share['profile_id']
  code: string
  meta?: Share['meta']
}

export type ShareClaim = {
  id: number
  share_id: Share['id']
  share_profile_id: Share['profile_id']
  profile_id: Share['profile_id']
  claimed_at: string | null
  created_source_id: number | null
  created_source_type: string | null
  created_source: any
  is_cloned: boolean
  meta: Share['meta']
  created_at: string | null
  updated_at: string | null
}
