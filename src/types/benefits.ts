// Route category: benefits

import type { AnyJsonRecord, AnyRecord, FilterOperator, NamedHandle, PeriodType } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type BenefitDefinitionTypeEnum = 'discount' | 'value' | 'competition' | 'event' | 'gift' | 'voucher' | 'bonus' | 'other'

export type BatchBenefitJsonItem = {
  benefit_definition_handle: string
  benefit_definition_id: number
  expires_at?: string | null
  external_id?: string | null
  issued_at: string | null
  meta?: AnyJsonRecord | null
  profile_id: string
  profile_id_handle?: string | null
  timezone: string
  value?: number | null
}

export type RequestCloneBenefitDefinition = {
  handle: string
  name?: string
}

export type RequestDownloadBenefitDefinitionCsv = {
  random?: number
  redeemed?: boolean
}

export type RequestExtendBenefit = {
  extend_date: string
  extend_days: number
  ids: number[]
  profile_id: string
}

export type RequestCreateBenefit = {
  benefit_definition_id: number
  expires_at?: string | null
  external_id?: string | null
  issued_at: string | null
  meta?: AnyJsonRecord | null
  profile_id: string
  timezone: string
  value?: number | null
}

export type RequestUpdateBenefit = {
  expires_at?: string | null
  external_id?: string | null
  meta?: AnyJsonRecord | null
  redeem_code_online?: string | null
  redeem_code_pos?: string | null
  value?: number | null
}

export type RequestQueryBenefit = {
  offset?: number
  limit?: number
  filter?: {
    benefit_definition_id?: string | FilterOperator
    expires_at?: string | FilterOperator
    issued_at?: string | FilterOperator
    meta?: string | FilterOperator
    external_id?: string | FilterOperator
    timezone?: string | FilterOperator
    claimed_at?: string | FilterOperator
    redeem_code_pos?: string | FilterOperator
    redeem_code_online?: string | FilterOperator
    value?: string | FilterOperator
    is_combined?: string | FilterOperator
    combine_meta?: string | FilterOperator
    extended_at?: string | FilterOperator
    source_id?: string | FilterOperator
    source_type?: string | FilterOperator
    definition?: {
      type?: string | FilterOperator
    }
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

export type RequestQueryBenefitDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    period?: string | FilterOperator
    period_type?: string | FilterOperator
    absolute_expiry?: string | FilterOperator
    description?: string | FilterOperator
    end_at?: string | FilterOperator
    internal_notes?: string | FilterOperator
    short_description?: string | FilterOperator
    long_description?: string | FilterOperator
    terms_conditions?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    redeem_instructions_store?: string | FilterOperator
    redeem_instructions_online?: string | FilterOperator
    redeem_code_pos?: string | FilterOperator
    redeem_code_online?: string | FilterOperator
    is_extendable?: string | FilterOperator
    is_reassignable?: string | FilterOperator
    is_assignable?: string | FilterOperator
    max_redemptions?: string | FilterOperator
    is_claimable?: string | FilterOperator
    claim_period_start_at?: string | FilterOperator
    claim_period_end_at?: string | FilterOperator
    max_global_redemptions?: string | FilterOperator
    claim_condition?: string | FilterOperator
    is_reclaimable?: string | FilterOperator
    notify_schedule_offset?: string | FilterOperator
    notify_issue_offset_days?: string | FilterOperator
    notify_issue_offset_hour?: string | FilterOperator
    notify_remind_offset_days?: string | FilterOperator
    notify_remind_offset_hour?: string | FilterOperator
    notify_extend_offset_days?: string | FilterOperator
    notify_extend_offset_hour?: string | FilterOperator
    force_allocation?: string | FilterOperator
    is_published?: string | FilterOperator
    is_archived?: string | FilterOperator
    created_at?: string | FilterOperator
    meta?: string | FilterOperator
    claim_timeframe?: string | FilterOperator
    view_condition?: string | FilterOperator
    visibility_condition?: string | FilterOperator
    allow_user_redeem?: string | FilterOperator
    value?: string | FilterOperator
    type?: string | FilterOperator
    campaign?: string | FilterOperator
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

export type BenefitBatchJsonResponse = {
  message: string
}

export type BenefitCountResponse = {
  data: {
    countAll: number
    countRedeemed: number
  }
}

export type RequestCreateBenefitDefinition = {
  absolute_expiry: string | null
  allow_user_redeem?: boolean | null
  campaign?: string | null
  claim_condition?: string[] | null
  claim_period_end_at?: string | null
  claim_period_start_at?: string | null
  claim_timeframe?: string[] | null
  currency?: string | null
  description?: string | null
  earn_instructions?: string | null
  end_at?: string | null
  extend_target_id?: number | null
  external_id?: string | null
  force_allocation?: boolean | null
  handle: string
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_archived?: boolean | null
  is_assignable?: boolean | null
  is_claimable?: boolean | null
  is_extendable?: boolean | null
  is_published?: boolean | null
  is_reassignable?: boolean | null
  is_reclaimable?: boolean | null
  issue_target_id?: number | null
  long_description?: string | null
  max_global_redemptions?: number | null
  max_redemptions?: number | null
  meta?: AnyJsonRecord | null
  name: string
  notify_extend_offset_days?: number | null
  notify_extend_offset_hour?: number | null
  notify_issue_offset_days?: number | null
  notify_issue_offset_hour?: number | null
  notify_remind_offset_days?: number | null
  notify_remind_offset_hour?: number | null
  period: number
  period_type?: PeriodType | null
  redeem_code_online?: string | null
  redeem_code_pos?: string | null
  redeem_instructions_online?: string | null
  redeem_instructions_store?: string | null
  region_id?: number | null
  remind_target_id?: number | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  type?: BenefitDefinitionTypeEnum | null
  value?: number | null
  view_condition?: string[] | null
  visibility_condition?: AnyJsonRecord | null
}

export type RequestUpdateBenefitDefinition = {
  absolute_expiry: string | null
  allow_user_redeem?: boolean | null
  campaign?: string | null
  claim_condition?: string[] | null
  claim_period_end_at?: string | null
  claim_period_start_at?: string | null
  claim_timeframe?: string[] | null
  currency?: string | null
  description?: string | null
  earn_instructions?: string | null
  end_at?: string | null
  extend_target_id?: number | null
  external_id?: string | null
  force_allocation?: boolean | null
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_archived?: boolean | null
  is_assignable?: boolean | null
  is_claimable?: boolean | null
  is_extendable?: boolean | null
  is_published?: boolean | null
  is_reassignable?: boolean | null
  is_reclaimable?: boolean | null
  issue_target_id?: number | null
  long_description?: string | null
  max_global_redemptions?: number | null
  max_redemptions?: number | null
  meta?: AnyJsonRecord | null
  name?: string
  notify_extend_offset_days?: number | null
  notify_extend_offset_hour?: number | null
  notify_issue_offset_days?: number | null
  notify_issue_offset_hour?: number | null
  notify_remind_offset_days?: number | null
  notify_remind_offset_hour?: number | null
  period?: number
  period_type?: PeriodType | null
  redeem_code_online?: string | null
  redeem_code_pos?: string | null
  redeem_instructions_online?: string | null
  redeem_instructions_store?: string | null
  region_id?: number | null
  remind_target_id?: number | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  type?: BenefitDefinitionTypeEnum | null
  value?: number | null
  view_condition?: string[] | null
  visibility_condition?: AnyJsonRecord | null
}

export type BenefitDefinition = {
  absolute_expiry: string | null
  allow_user_redeem: boolean
  campaign: string | null
  claim_condition: AnyJsonRecord | string | null
  claim_period_end_at: string | null
  claim_period_start_at: string | null
  claim_timeframe: string | null
  created_at: string
  currency: string | null
  description: string | null
  earn_instructions: string | null
  end_at: string | null
  extend_target_id: number
  external_id: string
  force_allocation: boolean
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  internal_notes: string | null
  is_archived: boolean
  is_assignable: boolean
  is_claimable: boolean
  is_extendable: boolean
  is_published: boolean
  is_reassignable: boolean
  is_reclaimable: boolean
  issue_target_id: number
  long_description: string | null
  max_global_redemptions: number | null
  max_redemptions: number | null
  meta: AnyRecord | null
  name: string | null
  notify_extend_offset_days: number | null
  notify_extend_offset_hour: number | null
  notify_issue_offset_days: number | null
  notify_issue_offset_hour: number | null
  notify_remind_offset_days: number | null
  notify_remind_offset_hour: number | null
  notify_schedule_offset: number | null
  period: number | null
  period_type: PeriodType
  redeem_code_online: string | null
  redeem_code_pos: string | null
  redeem_instructions_online: string | null
  redeem_instructions_store: string | null
  region: NamedHandle | null
  region_id: number
  remind_target_id: number
  same_campaign_count: number
  short_description: string | null
  tags: string[]
  terms_conditions: string | null
  total_allocations: number | null
  total_allocations_remaining: number | null
  total_global_created: number
  total_global_redemptions: number | null
  total_global_redemptions_remaining: number | null
  type: BenefitDefinitionTypeEnum | null
  updated_at: string
  value: number | null
  view_condition: AnyJsonRecord | string | null
  visibility_condition: AnyRecord | null
}

export type RequestBatchBenefitJson = {
  benefits: BatchBenefitJsonItem[] | null
}

export type BenefitDefinitionResponse = {
  data: BenefitDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Benefit = {
  claimed_at: string | null
  combine_meta: AnyJsonRecord | null
  created_at: string
  definition: BenefitDefinition
  expires_at: string | null
  extended_at: string | null
  external_id: string
  id: number
  is_combined: boolean
  is_expired: boolean
  is_redeemable: boolean
  issued_at: string
  meta: AnyRecord | null
  profile_id: string
  redeem_code_online: string | null
  redeem_code_pos: string | null
  redemptions_remaining: number | null
  source_id: number
  source_type: string | null
  timezone: string | null
  total_global_redemptions_remaining: number
  updated_at: string
  value: number | null
}

export type BenefitResponse = {
  data: Benefit[]
  meta?: PaginationMeta
  links?: PaginationLink
}
