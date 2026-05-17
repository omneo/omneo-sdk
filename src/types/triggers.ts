// Route category: triggers

import type { ActionArgumentRecord, FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Action } from './automations'

export type TriggerActionsItem = {
  arguments?: ActionArgumentRecord[] | null
  description?: string | null
  name: string
  notes?: string | null
  sort_order?: number | null
}

export type RequestQueryTrigger = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    trigger?: string | FilterOperator
    description?: string | FilterOperator
    notes?: string | FilterOperator
    is_active?: string | FilterOperator
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

export type Trigger = {
  actions: Action[]
  created_at: string
  description: string | null
  id: number
  is_active: boolean
  name: string | null
  notes: string | null
  trigger: string
  updated_at: string
}

export type TriggerActionResponse = {
  data: Action[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type RequestCreateTrigger = {
  actions?: TriggerActionsItem[] | null
  description?: string | null
  is_active?: boolean | null
  name: string
  notes?: string | null
  trigger: string
}

export type RequestUpdateTrigger = {
  actions?: TriggerActionsItem[] | null
  description?: string | null
  is_active?: boolean | null
  name?: string
  notes?: string | null
  trigger?: string
}

export type TriggerResponse = {
  data: Trigger[]
  meta?: PaginationMeta
  links?: PaginationLink
}
