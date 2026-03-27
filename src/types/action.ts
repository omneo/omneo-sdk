import { PaginationResponse } from './pagination'

export type ActionArgument = {
  name: string
  value: string | number | boolean | { var: string }
  is_dynamic?: boolean | null
}

export type ActionBase = {
  id: number
  uuid: string
  references_id: number | null
  name: string
  sort_order: number | null
  description: string | null
  notes: string | null
  arguments: ActionArgument[]
  created_at: string
  updated_at: string
}

export type ActionHistoryItem = {
  [key: string]: any
}

export type ActionHistory = {
  id: number
  actionable_type: string | null
  actionable_id: number | string | null
  items: ActionHistoryItem[]
  parent_id: number | null
  parent_history: ActionHistory | null
  children_history: ActionHistory[]
  created_at: string
  updated_at: string
}

export type ActionHistoryResponse = PaginationResponse &{
  data: ActionHistory[]
}
