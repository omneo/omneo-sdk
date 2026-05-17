// Route category: tiers

import type { AnyJsonRecord, AnyRecord, FilterOperator } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'
import type { Region } from './regions'
import type { Transaction, TransactionItem } from './transactions'

export type Tier = {
  achieved_at: string
  anniversary_at: string | null
  assigned_at: string | null
  handle: string | null
  id: number
  maintained_at: string | null
  name: string | null
  profile_id: string
}

export type RequestCreateTierDefinition = {
  description?: string | null
  disable_credit?: boolean | null
  earn_instructions?: string | null
  handle: string
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_assignable?: boolean | null
  long_description?: string | null
  meta?: AnyJsonRecord | null
  name: string
  region_id?: number | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  value_maintain?: number | null
  value_min: number
}

export type RequestCreateTierPoint = {
  accrued_at: string | null
  issued_at: string | null
  meta?: AnyJsonRecord | null
  point_definition_id: number
  profile_id: string
  value: number
}

export type RequestUpdateTierDefinition = {
  description?: string | null
  disable_credit?: boolean | null
  earn_instructions?: string | null
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_assignable?: boolean | null
  long_description?: string | null
  meta?: AnyJsonRecord | null
  name?: string
  region_id?: number | null
  short_description?: string | null
  tags?: string[]
  terms_conditions?: string | null
  value_maintain?: number
  value_min?: number
}

export type RequestQueryTierDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    period?: string | FilterOperator
    value_min?: string | FilterOperator
    value_maintain?: string | FilterOperator
    description?: string | FilterOperator
    is_assignable?: string | FilterOperator
    internal_notes?: string | FilterOperator
    short_description?: string | FilterOperator
    long_description?: string | FilterOperator
    terms_conditions?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    disable_credit?: string | FilterOperator
    meta?: string | FilterOperator
    region_id?: string | FilterOperator
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

export type RequestQueryTierPoint = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    issued_at?: string | FilterOperator
    point_definition_id?: string | FilterOperator
    source_id?: string | FilterOperator
    source_type?: string | FilterOperator
    value?: string | FilterOperator
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

export type TierDefinition = {
  created_at: string
  description: string | null
  disable_credit: boolean
  earn_instructions: string | null
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  internal_notes: string | null
  is_assignable: boolean
  is_floor: boolean
  long_description: string | null
  meta: AnyRecord | null
  name: string | null
  region: Region | null
  region_id: number
  short_description: string | null
  tags: string[]
  terms_conditions: string | null
  updated_at: string
  value_maintain: number | null
  value_min: number | null
}

export type TierPoint = {
  accrued_at: string
  created_at: string
  id: number
  issued_at: string
  meta: AnyRecord | null
  point_definition_id: number
  profile_id: string
  source: TransactionItem | Transaction | null
  source_id: number
  source_type: string | null
  status: string | null
  updated_at: string
  value: number | null
}

export type TierDefinitionResponse = {
  data: TierDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type TierPointResponse = {
  data: TierPoint[]
  meta?: PaginationMeta
  links?: PaginationLink
}
