// Route category: statuses

import type { FilterOperator, PeriodType } from './common'
import type { CustomFieldItem } from './custom-fields'

export type RequestCreateStatus = {
  absolute_expiry: string | null
  code?: string | null
  colour?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  earn_instructions?: string | null
  group_handle: string | null
  group_name: string | null
  handle: string
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  long_description?: string | null
  name: string
  period?: number | null
  period_type?: PeriodType
  primary_colour?: string | null
  secondary_colour?: string | null
  short_description?: string | null
  sort_order?: number | null
  terms_conditions?: string | null
  text_colour?: string | null
  timezone?: string | null
}

export type RequestUpdateStatus = {
  absolute_expiry: string | null
  code?: string | null
  colour?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  earn_instructions?: string | null
  group_handle?: string | null
  group_name?: string | null
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  long_description?: string | null
  name?: string
  period?: number | null
  period_type?: PeriodType
  primary_colour?: string | null
  secondary_colour?: string | null
  short_description?: string | null
  sort_order?: number | null
  terms_conditions?: string | null
  text_colour?: string | null
  timezone?: string | null
}

export type RequestQueryStatus = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    name?: string | FilterOperator
    handle?: string | FilterOperator
    sort_order?: string | FilterOperator
    code?: string | FilterOperator
    colour?: string | FilterOperator
    group_handle?: string | FilterOperator
    timezone?: string | FilterOperator
    period_type?: string | FilterOperator
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

export type Status = {
  absolute_expiry: string
  code: string | null
  colour: string | null
  created_at: string
  description: string | null
  earn_instructions: string | null
  group_handle: string | null
  group_name: string
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  internal_notes: string | null
  long_description: string | null
  name: string | null
  period: string
  period_type: PeriodType
  primary_colour: string
  secondary_colour: string
  short_description: string | null
  sort_order: number | null
  terms_conditions: string | null
  text_colour: string
  timezone: string | null
  updated_at: string
}

export type StatusResponse = {
  data: Status[]
}
