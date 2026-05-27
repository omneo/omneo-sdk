// Route category: currencies

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateCurrency = {
  from: string
  is_system?: boolean
  rate: number
  to: string
}

export type RequestUpdateCurrency = {
  rate: number
}

export type RequestQueryCurrency = {
  offset?: number
  limit?: number
  filter?: {
    from?: string | FilterOperator
    to?: string | FilterOperator
    rate?: string | FilterOperator
    is_system?: string | FilterOperator
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

export type Currency = {
  created_at: string
  from: string
  id: number
  is_system: boolean
  rate: number | null
  to: string
  updated_at: string
}

export type CurrencyResponse = {
  data: Currency[]
  meta?: PaginationMeta
  links?: PaginationLink
}
