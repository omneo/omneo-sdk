// Route category: targets

import type { AnyRecord, FilterOperator } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateTarget = {
  condition?: AnyRecord | null
  description?: string | null
  handle: string
  name: string
  notes?: string | null
  template: string
  url: string
}

export type RequestUpdateTarget = {
  condition?: AnyRecord | null
  description?: string | null
  name?: string
  notes?: string | null
  template?: string
  url?: string
}

export type RequestQueryTarget = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    url?: string | FilterOperator
    handle?: string | FilterOperator
    template?: string | FilterOperator
    notes?: string | FilterOperator
    condition?: string | FilterOperator
    description?: string | FilterOperator
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

export type Target = {
  condition: string | null
  created_at: string
  description: string | null
  handle: string | null
  id: number
  name: string | null
  notes: string | null
  template: string
  updated_at: string
  url: string
}

export type TargetResponse = {
  data: Target[]
  meta?: PaginationMeta
  links?: PaginationLink
}
