import { PaginationResponse } from './pagination'

export type RewardDefinitonPeriodType = 'days' | 'weeks' | 'months' | 'years' | 'absolute_date' | 'absolute_week' |'absolute_month'

export type RewardDefinition = {
  id: number
  name: string
  handle: string
  period: number
  period_type: RewardDefinitonPeriodType
  absolute_expiry: string | null
  description: string | null
  short_description: string | null
  long_description: string | null
  terms_conditions: string | null
  earn_instructions: string | null
  icon: string | null
  image_url: string | null
  issue_target_id: number | null
  expiry_target_id: number | null
  extend_target_id: number | null
  notify_issue_offset: number | null
  notify_expiry_offset: number | null
  notify_schedule_offset: number | null
  notify_issue_offset_days: number | null
  notify_issue_offset_hour: number | null
  notify_remind_offset_days: number | null
  notify_remind_offset_hour: number | null
  notify_extend_offset_days: number | null
  notify_extend_offset_hour: number | null
  internal_notes: string | null
  type: 'activation' | 'anniversary' | 'birthday' | 'bonus' | 'campaign' | 'customer-service' | 'reactivation' | 'spend' | 'staff' | 'system-adjustment' | 'tier' | 'achievement' | 'status' | 'points' | 'referral' | 'other'
  value: number
  max_value: number | null
  is_extendable: boolean
  is_assignable: boolean
  is_reassignable: boolean
  is_published: boolean
  extend_days: number
  tags: Array<string>
  created_at: string
  updated_at: string
}

export type Reward = {
  id: number
  profile_id: string
  timezone: string
  value_initial: number
  value_remaining: number
  has_notified_issue: boolean | null
  has_notified_expiry: boolean | null
  has_notified_extend: boolean | null
  expires_at: string
  issued_at: string
  is_expired: boolean
  is_active: boolean
  issued_local_at: string
  expires_local_at: string | null
  notify_issue_at: string | null
  notify_expiry_at: string | null
  extended_at: string | null
  definition: RewardDefinition
  meta: {[key: string]: any} | null
  created_at: string
  updated_at: string
}

export type RewardDefinitionResponse = PaginationResponse & {
  data: RewardDefinition[]
}

export type RewardResponse = PaginationResponse & {
  data: Reward[]
}

export type RewardDefinitionInput = {
  name: string
  handle: string
  value: number
  max_value: number | null
  type: string
  period: number
  period_type: RewardDefinitonPeriodType
  is_assignable: boolean
  is_published: boolean
  is_reassignable: boolean
  is_extendable: boolean
}

type RewardDefinitionRequireField = 'name' | 'handle' | 'value' | 'type' | 'period' | 'period_type'
export type RewardDefinitionCreateInput = Required<Pick<RewardDefinitionInput, RewardDefinitionRequireField >> &
  Partial<Omit<RewardDefinitionInput, RewardDefinitionRequireField>>
export type RewardDefinitionUpdateInput = Partial<RewardDefinitionInput>

export type RewardCreateInput = {
  value_initial: number
  value_remaining: number
  timezone: string
  expires_at: string
  issued_at?: string
  reward_definition_id?: number
  reward_definition_handle?: number
  profile_id: string
  external_id?: string | null
  meta?: object
}

export type RewardUpdateInput = {
  value_initial?: number
  value_remaining?: number
  expires_at?: string
  meta?: object
}
