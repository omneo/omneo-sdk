// Route category: regions

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Country } from './countries'

export type RegionCountriesItem = {
  iso_2?: string
  iso_3?: string
  iso_numeric?: string
}

export type RequestQueryRegion = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
    name?: string | FilterOperator
    is_default?: string | FilterOperator
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
  [key: string]: any
}

export type Region = {
  countries: Country[]
  created_at: string
  currency: string | null
  handle: string | null
  id: number
  is_default: boolean
  name: string | null
  updated_at: string
}

export type CountryRegion = {
  id: number
  name: string | null
  handle: string | null
  is_default: boolean
}

export type RequestCreateRegion = {
  countries?: RegionCountriesItem[]
  currency?: string | null
  handle: string
  is_default?: boolean | null
  name: string
}

export type RequestUpdateRegion = {
  countries?: RegionCountriesItem[]
  currency?: string | null
  is_default?: boolean | null
  name?: string
}

export type RegionResponse = {
  data: Region[]
  meta?: PaginationMeta
  links?: PaginationLink
}
