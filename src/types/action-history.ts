// Route category: action-history

import type { FilterOperator, AnyJsonRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestQueryActionHistory = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    actionable_type?: string | FilterOperator
    actionable_id?: string | FilterOperator
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

export type ActionHistoryItem = {
  action_history_id: number
  arguments: AnyJsonRecord | null
  context: AnyJsonRecord | null
  created_at: string
  handler: string
  id: number
  result: AnyJsonRecord | null
  status: string
  updated_at: string
}

export type ActionHistory = {
  actionable_id: number
  actionable_type: string
  children_history: ActionHistory[]
  created_at: string
  id: number
  items: ActionHistoryItem[]
  parent_history: ActionHistory | null
  parent_id: number
  updated_at: string
}

export type ActionHistoryResponse = {
  data: ActionHistory[]
  meta?: PaginationMeta
  links?: PaginationLink
}
