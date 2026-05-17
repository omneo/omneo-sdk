// Route category: countries

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { CountryRegion } from './regions'

export type CountryStatesItem = {
  iso: string
  iso_2_country: string
  iso_2_country_state_code: string
  name: string
  sort_order?: number | null
  type: string
}

export type RequestQueryCountry = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    iso_2?: string | FilterOperator
    iso_3?: string | FilterOperator
    iso_numeric?: string | FilterOperator
    sort_order?: string | FilterOperator
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

export type State = {
  created_at: string
  id: number
  iso: string
  iso_2_country: string
  iso_2_country_state_code: string
  name: string | null
  sort_order: number | null
  type: string | null
  updated_at: string
}

export type RequestCreateCountry = {
  currency?: string | null
  iso_2: string
  iso_3?: string | null
  iso_numeric?: string | null
  name: string
  sort_order?: number | null
  states?: CountryStatesItem[] | null
}

export type RequestUpdateCountry = {
  currency?: string | null
  name?: string
  sort_order?: number
  states?: CountryStatesItem[] | null
}

export type Country = {
  created_at: string
  currency: string | null
  id: number
  iso_2: string
  iso_3: string | null
  iso_numeric: string | null
  name: string | null
  region?: CountryRegion | null
  sort_order: number | null
  states: State[]
  updated_at: string
}

export type CountryResponse = {
  data: Country[]
  meta?: PaginationMeta
  links?: PaginationLink
}
