// Route category: roles

import type { AnyRecord, FilterOperator, PeriodType } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Permission } from './permissions'
import type { CustomFieldItem } from './custom-fields'

export type RequestCreateRoleDefinition = {
  absolute_expiry?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  group_handle?: string | null
  group_name?: string | null
  handle: string
  icon?: string | null
  image_url?: string | null
  meta?: AnyRecord | null
  name: string
  notes?: string | null
  period?: number | null
  period_type?: PeriodType | null
  short_description?: string | null
}

export type RequestUpdateRoleDefinition = {
  absolute_expiry?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  group_handle?: string | null
  group_name?: string | null
  icon?: string | null
  image_url?: string | null
  meta?: AnyRecord | null
  name?: string
  notes?: string | null
  period?: number | null
  period_type?: PeriodType | null
  short_description?: string | null
}

export type RequestQueryRoleDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    description?: string | FilterOperator
    short_description?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    timezone?: string | FilterOperator
    period?: string | FilterOperator
    period_type?: string | FilterOperator
    absolute_expiry?: string | FilterOperator
    group_name?: string | FilterOperator
    group_handle?: string | FilterOperator
    notes?: string | FilterOperator
    meta?: string | FilterOperator
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

export type Role = {
  handle: string | null
  id: number
  name: string | null
  permissions: Permission[]
  weight: number
}

export type RoleDefinitionCustomFields = {
  [namespace: string]: {
    [handle: string]: any
  }
}

export type RoleResponse = {
  data: Role[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type RoleDefinition = {
  absolute_expiry: string | null
  created_at: string | null
  custom_fields: RoleDefinitionCustomFields
  description: string | null
  group_handle: string | null
  group_name: string | null
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  meta: AnyRecord | null
  name: string | null
  notes: string | null
  period: number | null
  period_type: PeriodType
  short_description: string | null
  timezone: string | null
  updated_at: string | null
}

export type RoleDefinitionResponse = {
  data: RoleDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}
