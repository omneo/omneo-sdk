// Route category: rewards

import type { AnyJsonRecord, AnyRecord, FilterOperator, NamedHandle, PeriodType } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type RewardDefinitionTypeEnum = 'activation' | 'anniversary' | 'birthday' | 'bonus' | 'campaign' | 'customer-service' | 'reactivation' | 'spend' | 'staff' | 'system-adjustment' | 'tier' | 'achievement' | 'status' | 'points' | 'referral' | 'other'

export type BatchRewardJsonItem = {
  expires_at?: string
  external_id?: string | null
  issued_at?: string
  meta?: AnyJsonRecord | null
  profile_id: string
  profile_id_handle: string | null
  reward_definition_handle?: string | null
  reward_definition_id?: number | null
  timezone: string
  value_initial?: number
  value_remaining?: number
}

export type RequestExtendReward = {
  extend_date?: string | null
  extend_days?: number | null
  ids: number[]
  profile_id: string
}

export type RequestCreateReward = {
  expires_at?: string
  external_id?: string | null
  issued_at?: string
  meta?: AnyJsonRecord | null
  profile_id: string
  reward_definition_handle?: string | null
  reward_definition_id?: number | null
  timezone: string
  value_initial?: number
  value_remaining?: number
}

export type RequestUpdateReward = {
  expires_at?: string
  meta?: AnyJsonRecord | null
  value_initial?: number
  value_remaining?: number
}

export type RequestQueryReward = {
  offset?: number
  limit?: number
  filter?: {
    value_remaining?: string | FilterOperator
    value_initial?: string | FilterOperator
    expires_at?: string | FilterOperator
    timezone?: string | FilterOperator
    issued_at?: string | FilterOperator
    meta?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    external_id?: string | FilterOperator
    reward_definition_id?: string | FilterOperator
    external_code?: string | FilterOperator
    source_id?: string | FilterOperator
    source_type?: string | FilterOperator
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

export type RequestQueryRewardDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    period?: string | FilterOperator
    period_type?: string | FilterOperator
    absolute_expiry?: string | FilterOperator
    description?: string | FilterOperator
    short_description?: string | FilterOperator
    long_description?: string | FilterOperator
    terms_conditions?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    internal_notes?: string | FilterOperator
    value?: string | FilterOperator
    max_value?: string | FilterOperator
    type?: string | FilterOperator
    is_extendable?: string | FilterOperator
    is_reassignable?: string | FilterOperator
    is_assignable?: string | FilterOperator
    notify_issue_offset?: string | FilterOperator
    notify_expiry_offset?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    is_published?: string | FilterOperator
    notify_schedule_offset?: string | FilterOperator
    notify_issue_offset_days?: string | FilterOperator
    notify_issue_offset_hour?: string | FilterOperator
    notify_remind_offset_days?: string | FilterOperator
    notify_remind_offset_hour?: string | FilterOperator
    notify_extend_offset_days?: string | FilterOperator
    notify_extend_offset_hour?: string | FilterOperator
    extend_days?: string | FilterOperator
    region_id?: string | FilterOperator
    currency?: string | FilterOperator
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

export type RewardBatchJsonResponse = {
  message: string
}

export type RequestCreateRewardDefinition = {
  absolute_expiry?: string | null
  currency?: string | null
  description?: string | null
  earn_instructions?: string | null
  expiry_target_id?: number | null
  extend_days?: number | null
  extend_target_id?: number | null
  handle: string
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_assignable?: boolean | null
  is_extendable?: boolean | null
  is_published?: boolean | null
  is_reassignable?: boolean | null
  issue_target_id?: number | null
  long_description?: string | null
  max_value?: number | null
  name: string
  notify_expiry_offset?: number | null
  notify_extend_offset_days?: number | null
  notify_extend_offset_hour?: number | null
  notify_issue_offset?: number | null
  notify_issue_offset_days?: number | null
  notify_issue_offset_hour?: number | null
  notify_remind_offset_days?: number | null
  notify_remind_offset_hour?: number | null
  period: number
  period_type?: PeriodType
  region_id?: number | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  type: RewardDefinitionTypeEnum
  value: number
}

export type RequestUpdateRewardDefinition = {
  absolute_expiry?: string | null
  currency?: string | null
  description?: string | null
  earn_instructions?: string | null
  expiry_target_id?: number | null
  extend_days?: number | null
  extend_target_id?: number | null
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_assignable?: boolean | null
  is_extendable?: boolean | null
  is_published?: boolean | null
  is_reassignable?: boolean | null
  issue_target_id?: number | null
  long_description?: string | null
  max_value?: number | null
  name?: string
  notify_expiry_offset?: number | null
  notify_extend_offset_days?: number | null
  notify_extend_offset_hour?: number | null
  notify_issue_offset?: number | null
  notify_issue_offset_days?: number | null
  notify_issue_offset_hour?: number | null
  notify_remind_offset_days?: number | null
  notify_remind_offset_hour?: number | null
  period?: number
  period_type?: PeriodType
  region_id?: number | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  type?: RewardDefinitionTypeEnum
  value?: number
}

export type RewardDefinition = {
  absolute_expiry: string | null
  created_at: string
  currency: string | null
  description: string | null
  earn_instructions: string | null
  expiry_target_id: number
  extend_days: number | null
  extend_target_id: number
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  internal_notes: string | null
  is_assignable: boolean
  is_extendable: boolean
  is_published: boolean
  is_reassignable: boolean
  issue_target_id: number
  long_description: string | null
  max_value: number | null
  name: string | null
  notify_expiry_offset: number | null
  notify_extend_offset_days: number | null
  notify_extend_offset_hour: number | null
  notify_issue_offset: number | null
  notify_issue_offset_days: number | null
  notify_issue_offset_hour: number | null
  notify_remind_offset_days: number | null
  notify_remind_offset_hour: number | null
  notify_schedule_offset: number | null
  period: number | null
  period_type: PeriodType
  region: NamedHandle | null
  region_id: number
  short_description: string | null
  tags: string[]
  terms_conditions: string | null
  type: RewardDefinitionTypeEnum
  updated_at: string
  value: number | null
}

export type RequestBatchRewardJson = {
  rewards: BatchRewardJsonItem[] | null
}

export type RewardDefinitionResponse = {
  data: RewardDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Reward = {
  created_at: string
  definition: RewardDefinition
  expires_at: string | null
  expires_local_at: string | null
  extended_at: string | null
  has_notified_expiry: boolean
  has_notified_extend: boolean
  has_notified_issue: boolean
  id: number
  is_active: boolean
  is_expired: boolean
  issued_at: string | null
  issued_local_at: string | null
  meta: AnyRecord | null
  notify_expiry_at: string | null
  notify_issue_at: string | null
  profile_id: string
  source_id: number
  source_type: string | null
  timezone: string | null
  updated_at: string
  value_initial: number | null
  value_remaining: number | null
}

export type RewardResponse = {
  data: Reward[]
  meta?: PaginationMeta
  links?: PaginationLink
}
