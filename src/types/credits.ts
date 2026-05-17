// Route category: credits

import type { AnyJsonRecord, AnyRecord, FilterOperator, NamedHandle, PeriodType } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'
import type { CustomFieldItem, CustomFieldRaw } from './custom-fields'

export type CreditDefinitionTypeEnum = 'gift_card' | 'store_credit' | 'refund' | 'allowance' | 'voucher' | 'other'

export type CreditDefinitionCreditNumberRangeTypeEnum = 'sequential' | 'random' | 'other'

export type CreditDefinitionSecurityCodeTypeEnum = 'pin4' | 'pin6' | 'alnum6' | 'other'

export type RequestExtendCredit = {
  extend_date?: string | null
  extend_days?: number | null
  ids: number[]
  profile_id: string
}

export type RequestCreateCredit = {
  creator_profile_id?: string | null
  credit_definition_handle: string
  credit_definition_id: number
  credit_number?: string | null
  expires_at?: string | null
  extended_at?: string | null
  external_id?: string | null
  external_namespace?: string | null
  is_imported?: boolean | null
  issued_at?: string | null
  location_external_code?: string | null
  location_external_id?: string | null
  location_id?: number | null
  lock_expires_at?: string | null
  locked?: boolean
  message?: string | null
  meta?: AnyJsonRecord | null
  name?: string | null
  profile_id?: string | null
  recipient_email?: string | null
  recipient_first_name?: string | null
  released_at?: string | null
  security_code?: string | null
  source_id?: number | null
  source_type?: string | null
  staff_id?: string | null
  timezone?: string | null
  value_initial: number
  value_remaining?: number | null
}

export type RequestUpdateCredit = {
  creator_profile_id?: string | null
  credit_number?: string | null
  expires_at?: string | null
  extended_at?: string | null
  external_id?: string | null
  external_namespace?: string | null
  is_imported?: boolean | null
  issued_at?: string | null
  location_external_code?: string | null
  location_external_id?: string | null
  location_id?: number | null
  lock_expires_at?: string | null
  locked?: boolean
  message?: string | null
  meta?: AnyJsonRecord | null
  profile_id?: string | null
  recipient_email?: string | null
  recipient_first_name?: string | null
  released_at?: string | null
  security_code?: string | null
  value_initial?: number
  value_remaining?: number | null
}

export type RequestQueryCredit = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    profile_id?: string | FilterOperator
    credit_definition_id?: string | FilterOperator
    issued_at?: string | FilterOperator
    expires_at?: string | FilterOperator
    released_at?: string | FilterOperator
    extended_at?: string | FilterOperator
    timezone?: string | FilterOperator
    recipient_first_name?: string | FilterOperator
    recipient_email?: string | FilterOperator
    message?: string | FilterOperator
    value_initial?: string | FilterOperator
    value_remaining?: string | FilterOperator
    external_id?: string | FilterOperator
    external_namespace?: string | FilterOperator
    credit_number?: string | FilterOperator
    security_code?: string | FilterOperator
    source_id?: string | FilterOperator
    source_type?: string | FilterOperator
    locked?: string | FilterOperator
    lock_expires_at?: string | FilterOperator
    has_notified_issue?: string | FilterOperator
    has_notified_expiry?: string | FilterOperator
    has_notified_release?: string | FilterOperator
    has_notified_remind?: string | FilterOperator
    has_notified_extend?: string | FilterOperator
    meta?: string | FilterOperator
    location_id?: string | FilterOperator
    is_imported?: string | FilterOperator
    definition?: {
      handle?: string | FilterOperator
    }
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
}

export type RequestQueryCreditDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    timezone?: string | FilterOperator
    period?: string | FilterOperator
    period_type?: string | FilterOperator
    absolute_expiry?: string | FilterOperator
    release_period?: string | FilterOperator
    release_period_type?: string | FilterOperator
    release_period_absolute_expiry?: string | FilterOperator
    is_published?: string | FilterOperator
    is_archived?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    primary_colour?: string | FilterOperator
    secondary_colour?: string | FilterOperator
    description?: string | FilterOperator
    internal_notes?: string | FilterOperator
    short_description?: string | FilterOperator
    long_description?: string | FilterOperator
    terms_conditions?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    meta?: string | FilterOperator
    type?: string | FilterOperator
    value?: string | FilterOperator
    max_value?: string | FilterOperator
    require_creator?: string | FilterOperator
    require_assigned?: string | FilterOperator
    is_extendable?: string | FilterOperator
    is_assignable?: string | FilterOperator
    is_releasable?: string | FilterOperator
    is_reassignable?: string | FilterOperator
    require_security_code?: string | FilterOperator
    extend_days?: string | FilterOperator
    credit_number_range_type?: string | FilterOperator
    credit_number_range_start?: string | FilterOperator
    credit_number_range_end?: string | FilterOperator
    credit_number_length?: string | FilterOperator
    security_code_type?: string | FilterOperator
    use_custom_numbers?: string | FilterOperator
    notify_schedule_offset?: string | FilterOperator
    notify_issue_offset_days?: string | FilterOperator
    notify_issue_offset_hour?: string | FilterOperator
    notify_remind_offset_days?: string | FilterOperator
    notify_remind_offset_hour?: string | FilterOperator
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

export type RequestCreateCreditDefinition = {
  absolute_expiry: string | null
  credit_number_length?: number | null
  credit_number_range_end: string | null
  credit_number_range_start: string | null
  credit_number_range_type?: CreditDefinitionCreditNumberRangeTypeEnum | null
  currency?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  earn_instructions?: string | null
  expiry_target_id?: number | null
  extend_days?: number | null
  extend_target_id?: number | null
  handle: string
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_archived?: boolean
  is_assignable?: boolean
  is_extendable?: boolean
  is_published?: boolean
  is_reassignable?: boolean
  is_releasable?: boolean
  issue_target_id?: number | null
  long_description?: string | null
  max_value?: number | null
  meta?: AnyJsonRecord | null
  name: string
  notify_issue_offset_days?: number | null
  notify_issue_offset_hour?: number | null
  notify_remind_offset_days?: number | null
  notify_remind_offset_hour?: number | null
  notify_schedule_offset?: number | null
  period?: number
  period_type?: PeriodType
  primary_colour?: string | null
  region_id?: number | null
  release_period?: number | null
  release_period_absolute_expiry: string | null
  release_period_type?: PeriodType | null
  release_target_id?: number | null
  remind_target_id?: number | null
  require_assigned?: boolean
  require_creator?: boolean
  require_security_code?: boolean
  secondary_colour?: string | null
  security_code_type?: CreditDefinitionSecurityCodeTypeEnum | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  timezone?: string
  type: CreditDefinitionTypeEnum
  use_custom_numbers?: boolean
  value?: AnyJsonRecord | null
}

export type RequestUpdateCreditDefinition = {
  absolute_expiry: string | null
  credit_number_length?: number | null
  credit_number_range_end: string | null
  credit_number_range_start: string | null
  credit_number_range_type?: CreditDefinitionCreditNumberRangeTypeEnum | null
  currency?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  earn_instructions?: string | null
  expiry_target_id?: number | null
  extend_days?: number | null
  extend_target_id?: number | null
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_archived?: boolean
  is_assignable?: boolean
  is_extendable?: boolean
  is_published?: boolean
  is_reassignable?: boolean
  is_releasable?: boolean
  issue_target_id?: number | null
  long_description?: string | null
  max_value?: number | null
  meta?: AnyJsonRecord | null
  name?: string
  notify_issue_offset_days?: number | null
  notify_issue_offset_hour?: number | null
  notify_remind_offset_days?: number | null
  notify_remind_offset_hour?: number | null
  notify_schedule_offset?: number | null
  period?: number
  period_type?: PeriodType
  primary_colour?: string | null
  region_id?: number | null
  release_period?: number | null
  release_period_absolute_expiry: string | null
  release_period_type?: PeriodType | null
  release_target_id?: number | null
  remind_target_id?: number | null
  require_assigned?: boolean
  require_creator?: boolean
  require_security_code?: boolean
  secondary_colour?: string | null
  security_code_type?: CreditDefinitionSecurityCodeTypeEnum | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  timezone?: string
  type?: CreditDefinitionTypeEnum
  use_custom_numbers?: boolean
  value?: AnyJsonRecord | null
}

export type CreditDefinition = {
  absolute_expiry: string | null
  created_at: string
  credit_number_length: number | null
  credit_number_range_end: string | null
  credit_number_range_start: string | null
  credit_number_range_type: CreditDefinitionCreditNumberRangeTypeEnum
  currency: string | null
  currency_id: number
  custom_fields: CustomFieldRaw[]
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
  is_archived: boolean
  is_assignable: boolean
  is_extendable: boolean
  is_published: boolean
  is_reassignable: boolean
  is_releasable: boolean
  issue_target_id: number
  long_description: string | null
  max_value: number | null
  meta: AnyRecord | null
  name: string | null
  notify_issue_offset_days: number | null
  notify_issue_offset_hour: number | null
  notify_remind_offset_days: number | null
  notify_remind_offset_hour: number | null
  notify_schedule_offset: number | null
  period: number
  period_type: PeriodType
  primary_colour: string | null
  region: NamedHandle
  region_id: number
  release_period: number | null
  release_period_absolute_expiry: string | null
  release_period_type: PeriodType
  release_target_id: number
  remind_target_id: number
  require_assigned: boolean
  require_creator: boolean
  require_security_code: boolean
  secondary_colour: string | null
  security_code_type: CreditDefinitionSecurityCodeTypeEnum
  short_description: string | null
  tags: string[]
  terms_conditions: string | null
  timezone: string | null
  type: CreditDefinitionTypeEnum
  updated_at: string
  use_custom_numbers: boolean
  value: number | null
}

export type CreditDefinitionResponse = {
  data: CreditDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Credit = {
  created_at: string
  creator_profile_id: string
  credit_definition_id: number
  credit_number: string | null
  definition: CreditDefinition
  expires_at: string | null
  extended_at: string | null
  external_id: string
  external_namespace: string | null
  has_notified_expiry: boolean
  has_notified_extend: boolean
  has_notified_issue: boolean
  has_notified_release: boolean
  has_notified_remind: boolean
  id: number
  is_imported: boolean
  is_system_generated: boolean
  issued_at: string | null
  location_id: number
  lock_expires_at: string | null
  locked: boolean
  message: string | null
  meta: AnyRecord | null
  name: string | null
  profile_id: string
  recipient_email: string | null
  recipient_first_name: string | null
  released_at: string | null
  security_code: string | null
  source_id: number
  source_type: string | null
  staff_id: string | null
  timezone: string | null
  updated_at: string
  value_initial: number | null
  value_remaining: number | null
}

export type CreditResponse = {
  data: Credit[]
  meta?: PaginationMeta
  links?: PaginationLink
}
