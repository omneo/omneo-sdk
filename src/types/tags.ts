// Route category: tags

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateTag = {
  handle: string
}

export type RequestQueryTag = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
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

export type TagOriginal = {
  created_at: string
  handle: string | null
  id: number
  updated_at: string
}

export type TagOriginalResponse = {
  data: TagOriginal[]
  meta?: PaginationMeta
  links?: PaginationLink
}
