import { CreateCustomFieldInput } from './custom-field'
import { PeriodType } from './misc'
import { PaginationResponse } from './pagination'

export type RolePermission = {
  id: number
  name: string | null
  handle: 'create' | 'read' | 'update' | 'delete'
}

export type Role = {
  id: number
  name: string
  handle: string
  weight: number
  permissions: RolePermission[]
}

export type RoleResponse = PaginationResponse & {
  data: Role[]
}

export type RoleDefinition = {
  id: number
  name: string
  handle: string
  description: string | null
  short_description: string | null
  icon: string | null
  image_url: string | null
  timezone: string | null
  period: number | null
  period_type: PeriodType | null
  absolute_expiry: string | null
  group_name: string | null
  group_handle: string | null
  notes: string | null
  meta: { [key: string]: any } | null
  custom_fields: { [namespace: string]: { [handle: string]: any } }
  created_at: string | null
  updated_at: string | null
}

export type RoleDefinitionResponse = PaginationResponse & {
  data: RoleDefinition[]
}

export type CreateRoleDefinitionInput = {
  name: string
  handle: string
  description?: string | null
  short_description?: string | null
  icon?: string | null
  image_url?: string | null
  period?: number | null
  period_type?: PeriodType | null
  absolute_expiry?: string | null
  notes?: string | null
  group_name?: string | null
  group_handle?: string | null
  meta?: { [key: string]: any } | null
  custom_fields?: Pick<CreateCustomFieldInput, 'namespace' | 'handle' | 'type' | 'value'>[]
}

export type UpdateRoleDefinitionInput = Omit<Partial<CreateRoleDefinitionInput>, 'handle'>
