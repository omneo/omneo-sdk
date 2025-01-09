import { PaginationResponse, PeriodType } from '.'

export type BenefitDefinition = {
  id: string
  name: string
  handle: string
  period: number
  period_type: PeriodType
  absolute_expiry: string | null
  description: string | null
  internal_notes: string | null
  meta: { [key: string]: any } | null
  short_description: string | null
  long_description: string | null
  terms_conditions: string | null
  earn_instructions: string | null
  redeem_instructions_store: string | null
  redeem_instructions_online: string | null
  redeem_code_pos: string | null
  redeem_code_online: string | null
  icon: string | null
  image_url: string | null
  max_redemptions: number
  is_extendable: boolean
  is_assignable: boolean
  is_reassignable: boolean
  is_published: boolean
  is_archived: boolean
  tags: string[]
  is_claimable: boolean
  max_global_redemptions: number | null
  total_global_redemptions_remaining: number | null
  total_global_redemptions: number
  total_global_created: number
  claim_period_start_at: string | null
  claim_period_end_at: string | null
  claim_condition: string | null
  is_reclaimable: boolean | null
  notify_schedule_offset: number | null
  notify_issue_offset_days: number | null
  notify_issue_offset_hour: number | null
  notify_remind_offset_days: number | null
  notify_remind_offset_hour: number | null
  notify_extend_offset_days: number | null
  notify_extend_offset_hour: number | null
  remind_target_id: string | null
  extend_target_id: string | null
  issue_target_id: string | null
  end_at: string | null
  total_allocations: number | null
  total_allocations_remaining: number | null
  force_allocation: boolean | null
  created_at: string
  updated_at: string
  claim_timeframe: string | null
  view_condition: string | null
  allow_user_redeem: boolean
  value: number | null
  type: string | null
}

export type Benefit = {
  id: number
  profile_id: string
  external_id: string | null
  expires_at: string
  issued_at: string
  is_expired: boolean
  is_redeemable: boolean
  redemptions_remaining: number
  total_global_redemptions_remaining: number
  definition: BenefitDefinition
  timezone: string
  claimed_at: string | null
  meta: { [key: string]: any } | null
  redeem_code_pos: string | null
  redeem_code_online: string | null
  created_at: string
  updated_at: string
  value: number | null
  combine_meta: { [key: string]: any } | null
  is_combined: boolean | null
  extended_at: string | null
}

export type BenefitDefinitionResponse = PaginationResponse & {
  data: BenefitDefinition[]
}

export type BenefitDefinitionInput = Partial<Omit<BenefitDefinition, 'id' | 'created_at' | 'updated_at'>> & {
  name: BenefitDefinition['name']
  handle: BenefitDefinition['handle']
  period: BenefitDefinition['period']
}

export type BenefitInput = {
  issued_at: Benefit['issued_at']
  benefit_definition_id: number
  profile_id: string
  timezone: string
  external_id?: string
  meta?: { [key: string]: any } | null
  expires_at?: string
}

export type BenefitResponse = PaginationResponse & {
  data: Benefit[]
}
