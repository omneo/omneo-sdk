// Route category: systems

import type { FilterOperator } from './common'

export type RequestCreateSystem = {
  handle: string
}

export type RequestQuerySystem = {
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
  [key: string]: any
}

export type System = {
  id: number
  handle: string
  created_at: string
  updated_at: string
}

export type SystemResponse = { data: System[] }

export type SystemStoreResponse = { data: System }

export type SystemShowResponse = { data: System }
