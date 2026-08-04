import { Currency, CustomField, PaginationResponse, PeriodType, Region } from '.'

export type CreditDefinition = {
  id: number
  name: string
  handle: string
  region_id: number | null
  region: Region | null
  timezone: string
  period: number
  period_type: PeriodType | string
  absolute_expiry: string | null
  release_period: number
  release_period_type: PeriodType | string
  release_period_absolute_expiry: string | null
  is_published: boolean
  is_archived: boolean
  icon: string | null
  image_url: string | null
  primary_colour: string | null
  secondary_colour: string | null
  description: string | null
  internal_notes: string | null
  short_description: string | null
  long_description: string | null
  terms_conditions: string | null
  earn_instructions: string | null
  meta: { [key: string]: any } | null
  type: string | null | 'gift_card' | 'store_credit' | 'refund' | 'allowance' | 'voucher' | 'other'
  value: number | null
  max_value: number | null
  currency_id: number | null
  currency: Currency | null
  require_creator: boolean | null
  require_assigned: boolean | null
  is_extendable: boolean | null
  is_assignable: boolean | null
  is_releasable: boolean | null
  is_reassignable: boolean | null
  require_security_code: boolean | null
  extend_days: number | null
  credit_number_range_type: string | null | 'sequential' | 'random' | 'other'
  credit_number_range_start: string | null
  credit_number_range_end: string | null
  credit_number_length: number | null
  security_code_type: string | null | 'pin4' | 'pin6' | 'alnum6' | 'other'
  use_custom_numbers: boolean | null
  notify_schedule_offset: number | null
  issue_target_id: number | null
  expiry_target_id: number | null
  release_target_id: number | null
  remind_target_id: number | null
  extend_target_id: number | null
  notify_issue_offset_days: number | null
  notify_issue_offset_hour: number | null
  notify_extend_offset_days: number | null
  notify_extend_offset_hour: number | null
  notify_remind_offset_days: number | null
  notify_remind_offset_hour: number | null
  tags?: string[] | null
  custom_fields?: CustomField[]
  created_at: string
  updated_at: string
}

export type Credit = {
  id: number
  profile_id: string
  creator_profile_id: string | null
  staff_id: string | null
  location_id: string | null
  name: string
  credit_definition_id: string
  definition: CreditDefinition | null
  recipient_first_name: string
  recipient_email: string
  message: string
  timezone: string
  issued_at: string
  expires_at: string | null
  released_at: string | null
  extended_at: string | null
  value_initial: number | null
  value_remaining: number | null
  external_id: string | null
  external_namespace: string | null
  credit_number: string | null
  security_code: string | null
  source_id: string | null
  source_type: string | null
  locked: boolean | null
  lock_expires_at: string | null
  has_notified_issue: boolean | null
  has_notified_expiry: boolean | null
  has_notified_release: boolean | null
  has_notified_remind: boolean | null
  has_notified_extend: boolean | null
  meta: { [key: string]: any } | null
  is_imported: boolean | null
  is_system_generated: boolean | null
  created_at: string
  updated_at: string
}

export type CreditDefinitionResponse = PaginationResponse & {
  data: CreditDefinition[]
}

type CreditDefinitionEditable = Omit<
  CreditDefinition,
  'id' | 'created_at' | 'updated_at' | 'region' | 'currency' | 'currency_id'
> & {
  currency?: string | null
}

type CreditDefinitionRequiredFields = 'name' | 'handle' | 'type'

export type CreditDefinitionInput =
  Required<Pick<CreditDefinitionEditable, CreditDefinitionRequiredFields>>
  & Partial<Omit<CreditDefinitionEditable, CreditDefinitionRequiredFields>>

export type UpdateCreditDefinitionInput = Partial<CreditDefinitionInput>

export type CreditInput = {
  credit_definition_id?: number
  credit_definition_handle?: string
  profile_id?: string
  creator_profile_id?: string
  staff_id?: string
  name?: string
  timezone?: string

  issued_at?: string
  expires_at?: string
  released_at?: string
  extended_at?: string
  recipient_first_name?: string
  recipient_email?: string
  message?: string
  value_initial?: number
  value_remaining?: number
  external_id?: string
  external_namespace?: string
  credit_number?: string
  security_code?: string
  source_id?: string
  source_type?: string
  location_id?: string
  locked?: string
  lock_expires_at?: string
  is_imported?: boolean
  meta?: { [key: string]: any } | null
}

export type UpdateCreditInput = Partial<Omit<CreditInput, 'credit_definition_id' | 'credit_definition_handle' | 'staff_id' | 'name' | 'timezone' | 'source_id' | 'source_type'>>

export type ExtendCreditInput = {
  profile_id: string
  ids: string[]
  extend_days?: string
  extend_date?: string
}

export type CreditResponse = PaginationResponse & {
  data: Credit[]
}
