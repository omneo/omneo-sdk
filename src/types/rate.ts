import { PaginationResponse } from './pagination'

export type Rate = {
  id: number
  handle: string
  type: string
  location: string | null
  code: string | null
  name: string
  rate: number
  is_default: boolean
  is_archived: boolean
  region_id: number | null
  region: {
    id: number
    name: string
    handle: string
  } | null
  location_id: number | null
  location_object: {
    id: number
    name: string
    handle: string
  } | null
  country_iso_2: string | null
  profile_conditions: { [key: string]: any } | null
  product_conditions: { [key: string]: any } | null
  start_time: string | null
  end_time: string | null
  issue_period: number | null
  issue_period_type: string | null
  issue_absolute_expiry: string | null
  earn_instructions: { [key: string]: any } | null
  internal_notes: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export type RateIssuePeriodType = 'hours' | 'days' | 'weeks' | 'months' | 'years' | 'absolute_date' | 'absolute_week' | 'absolute_month'

export type CreateRateInput = {
  handle: string
  type: string
  rate: number
  location?: any | null
  code?: string | null
  name?: string | null
  is_default?: boolean | null
  region_id?: number | null
  location_id?: number | null
  country_iso_2?: string | null
  profile_conditions?: { [key: string]: any } | null
  product_conditions?: { [key: string]: any } | null
  start_time?: string | null
  end_time?: string | null
  issue_period?: number | null
  issue_period_type?: RateIssuePeriodType | null
  issue_absolute_expiry?: string | null
  earn_instructions?: string | null
  internal_notes?: string | null
  is_published?: boolean | null
}

export type UpdateRateInput = Partial<CreateRateInput>

export type CalculateRateInput = {
  handle: string
  type: string
  location: any
  code: string
  price: number
}

export type SearchRateAttribute = {
  code?: string
  location?: string
}

export type RateResponse = PaginationResponse & {
  data: Rate[]
}
