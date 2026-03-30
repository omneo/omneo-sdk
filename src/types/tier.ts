import { PaginationResponse } from './pagination'
import { Region } from './region'
import { Transaction, TransactionItem } from './transaction'

export type Tier = {
  id: number
  profile_id: string
  name: string
  handle: string
  anniversary_at: string
  maintained_at: string
  assigned_at: string | null
  achieved_at: string
}

export type TierDefinition = {
  id: number
  name: string
  handle: string
  is_floor: boolean
  value_min: number
  value_maintain: number
  is_assignable: boolean
  internal_notes: string | null
  description: string | null
  short_description: string | null
  long_description: string | null
  terms_conditions: string | null
  icon: string | null
  image_url: string | null
  earn_instructions: string | null
  disable_credit: boolean | null
  tags: Array<string> | []
  meta: { [key: string]: any } | null
  region_id: number | null
  region: Region | null
  created_at: string
  updated_at: string
}
export type TierDefinitionResponse = PaginationResponse & {
  data: TierDefinition[]
}

type TierDefinitionEditable = Omit<TierDefinition, 'id' | 'created_at' | 'updated_at'>
type TierDefinitionCreateRequiredField = 'name' | 'handle' | 'value_min'

export type CreateTierDefinitionInput =
  Required<Pick<TierDefinitionEditable, TierDefinitionCreateRequiredField>> &
  Partial<Omit<TierDefinitionEditable, TierDefinitionCreateRequiredField>> & {
    region_id?: number | null
  }

export type UpdateTierDefinitionInput = Partial<Omit<CreateTierDefinitionInput, 'handle'>>

export type TierProgress = {
  id: number
  profile_id: string
  current_tier: Tier | null
  next_tier: Tier | null
  prev_tier: Tier | null
  is_floor: boolean
  current_credit: number
  current_progress: number
  current_remain: number
  next_progress: number
  next_remain: number
  total_points_12m: number
  total_points_achievement: number
  next_progress_change_at: string
  anniversary_at: string
  maintained_at: string | null
  assigned_at: string | null
  achieved_at: string
  created_at: string
  updated_at: string
}

export type TierPoint = {
  id: number
  profile_id: string
  point_definition_id: number
  value: number
  issued_at: string
  accrued_at: string
  status: string | null
  source_id: number | null
  source_type: string | null
  source: TransactionItem | Transaction | null
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type CreateTierPointInput = {
  profile_id: string
  point_definition_id: number
  value: number
  issued_at?: string | null
  accrued_at?: string | null
  meta?: { [key: string]: any } | null
}

export type TierPointsResponse = PaginationResponse & {
  data: TierPoint[]
}
