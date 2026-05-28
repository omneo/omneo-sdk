// Route category: rates

import type { AnyJsonRecord, FilterOperator, IssuePeriodType, LocationHandle, NamedHandle } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCalculateRate = {
  code: string
  handle: string
  location: AnyJsonRecord | null
  price: number
  type: string
}

export type RequestEstimateProductRate = {
  country?: string | null
  definition: string
  location_id?: number | null
  product_id: number
  region?: string | null
}

export type RequestEstimateProductVariantRate = {
  barcode?: string | null
  country?: string | null
  definition: string
  external_id?: string | null
  location_id?: number | null
  region?: string | null
  sku?: string | null
}

export type RequestCreateRate = {
  code?: string | null
  country_iso_2?: string | null
  earn_instructions?: string | null
  end_time?: string | null
  handle: string
  internal_notes?: string | null
  is_default?: boolean | null
  is_published?: boolean | null
  issue_absolute_expiry?: string | null
  issue_period?: number | null
  issue_period_type?: IssuePeriodType | null
  location?: string | AnyJsonRecord | null
  location_id?: number | null
  name?: string | null
  priority?: number | null
  product_conditions?: string[] | null
  profile_conditions?: string[] | null
  rate: number
  region_id?: number | null
  start_time?: string | null
  type: string
}

export type RequestUpdateRate = {
  code?: string | null
  country_iso_2?: string | null
  earn_instructions?: string | null
  end_time?: string | null
  handle?: string
  internal_notes?: string | null
  is_default?: boolean | null
  is_published?: boolean | null
  issue_absolute_expiry?: string | null
  issue_period?: number | null
  issue_period_type?: IssuePeriodType | null
  location?: string | null
  location_id?: number | null
  name?: string | null
  priority?: number | null
  product_conditions?: string[] | null
  profile_conditions?: string[] | null
  rate?: number
  region_id?: number | null
  start_time?: string | null
  type?: string
}

export type RequestQueryRate = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
    type?: string | FilterOperator
    location?: string | FilterOperator
    code?: string | FilterOperator
    name?: string | FilterOperator
    rate?: string | FilterOperator
    is_default?: string | FilterOperator
    is_archived?: string | FilterOperator
    region_id?: string | FilterOperator
    location_id?: string | FilterOperator
    country_iso_2?: string | FilterOperator
    profile_conditions?: string | FilterOperator
    product_conditions?: string | FilterOperator
    start_time?: string | FilterOperator
    end_time?: string | FilterOperator
    issue_period?: string | FilterOperator
    issue_period_type?: string | FilterOperator
    issue_absolute_expiry?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    internal_notes?: string | FilterOperator
    is_published?: string | FilterOperator
    priority?: string | FilterOperator
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
  [key: string]: any
}

export type Rate = {
  code: string | null
  country_iso_2: string | null
  created_at: string
  earn_instructions: string | null
  end_time: string | null
  handle: string | null
  id: number
  internal_notes: string | null
  is_archived: boolean
  is_default: boolean
  is_published: boolean
  issue_absolute_expiry: string | null
  issue_period: number | null
  issue_period_type: IssuePeriodType
  location: string | null
  location_id: number
  location_object: LocationHandle | null
  name: string | null
  priority: number | null
  product_conditions: AnyJsonRecord | null
  profile_conditions: AnyJsonRecord | null
  rate: number
  region: NamedHandle
  region_id: number
  start_time: string | null
  type: string | null
  updated_at: string
}

export type EstimatedRate = {
  name: string
  handle: string
  rate: number
  location: string
  code: string
  region_id: number | null
  country_iso_2: string | null
  priority: number
}

export type RateCalculateResponse = {
  total: number
}

export type RateResponse = {
  data: Rate[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type RateSearchAttributesResponse = Partial<Rate>[]

export type RateEstimateProductRateResponse = {
  data: EstimatedRate | null
}

export type RateEstimateProductVariantRateResponse = {
  data: EstimatedRate | null
}
