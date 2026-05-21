// Route category: points

import type { AnyJsonRecord, AnyRecord, FilterOperator, IssuePeriodType } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Rate } from './rates'
import type { Region } from './regions'

export type RequestCreatePoint = {
  accrued_at?: string | null
  description?: string | null
  expires_at?: string | null
  issued_at?: string | null
  meta?: AnyJsonRecord | null
  point_definition_id: number
  profile_id: string
  value_initial: number
  value_remaining?: number | null
}

export type RequestCreatePointDefinition = {
  currency?: string | null
  description?: string | null
  handle: string
  is_reassignable?: boolean | null
  issue_absolute_expiry?: string | null
  issue_period?: number | null
  issue_period_type?: IssuePeriodType | null
  name: string
  notes?: string | null
  region_id?: number | null
  tags?: string[]
}

export type RequestUpdatePointDefinition = {
  currency?: string | null
  description?: string | null
  is_reassignable?: boolean | null
  issue_absolute_expiry?: string | null
  issue_period?: number | null
  issue_period_type?: IssuePeriodType | null
  name?: string
  notes?: string | null
  region_id?: number | null
  tags?: string[]
}

export type RequestQueryPoint = {
  offset?: number
  limit?: number
  filter?: {
    value_remaining?: string | FilterOperator
    value_initial?: string | FilterOperator
    issued_at?: string | FilterOperator
    accrued_at?: string | FilterOperator
    rate_id?: string | FilterOperator
    source_id?: string | FilterOperator
    source_type?: string | FilterOperator
    expires_at?: string | FilterOperator
    linked_profile_id?: string | FilterOperator
    description?: string | FilterOperator
    meta?: string | FilterOperator
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

export type RequestQueryPointDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    description?: string | FilterOperator
    notes?: string | FilterOperator
    is_reassignable?: string | FilterOperator
    handle?: string | FilterOperator
    issue_period?: string | FilterOperator
    issue_period_type?: string | FilterOperator
    issue_absolute_expiry?: string | FilterOperator
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

export type PointDefinition = {
  created_at: string
  currency: string | null
  description: string | null
  handle: string | null
  id: number
  is_reassignable: boolean
  issue_absolute_expiry: string | null
  issue_period: number | null
  issue_period_type: IssuePeriodType
  name: string | null
  notes: string | null
  region: Region | null
  region_id: number
  tags: string[]
  updated_at: string
}

export type PointDefinitionResponse = {
  data: PointDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Point = {
  accrued_at: string
  created_at: string
  definition: PointDefinition
  description: string | null
  expires_at: string
  id: number
  issued_at: string
  linked_profile_id: string
  meta: AnyRecord | null
  profile_id: string
  rate: Rate | null
  source: AnyJsonRecord | null
  source_type: string | null
  status: string | null
  updated_at: string
  value_initial: number
  value_initial_currency: number | null
  value_remaining: number | null
  value_remaining_currency: number | null
}

export type PointResponse = {
  data: Point[]
  meta?: PaginationMeta
  links?: PaginationLink
}
