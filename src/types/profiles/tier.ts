import type { TierDefinition } from '../tiers'
export type RequestAssignProfileTierRequest = {
  tier: string
}

export type RequestGetTierPointsBySource = {
  identifier: string
  identifier_type: string
  source: string
}

export type TierProgress = {
  id: number
  profile_id: number
  is_floor: boolean
  current_credit: number | null
  current_progress: number | null
  current_remain: number | null
  next_progress: number | null
  next_remain: number | null
  total_points_12m: number | null
  total_points_achievement: number | null
  next_progress_change_at: string | null
  anniversary_at: string | null
  maintained_at: string | null
  assigned_at: string | null
  achieved_at: string
  created_at: string
  updated_at: string
  current_tier: TierDefinition
  next_tier: TierDefinition | null
  prev_tier: TierDefinition | null
}

export type ProfileTierAssignResponse = {
  data: TierProgress
}
