// Route category: custom-fields

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type CustomFieldBatchDeleteItem = {
  handle: string
  namespace: string
}

export type CustomFieldTypeEnum = 'string' | 'integer' | 'float' | 'boolean' | 'json' | 'array'

export type RequestQueryCustomField = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
    namespace?: string | FilterOperator
    name?: string | FilterOperator
    type?: string | FilterOperator
    value?: string | FilterOperator
    version?: string | FilterOperator
    current?: string | FilterOperator
    is_index?: string | FilterOperator
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

export type CustomFieldBatchJsonDeleteResponse = {
  deleted: number
}

export type CustomFieldRaw = {
  created_at: string
  custom_fieldable_id: number
  custom_fieldable_type: string
  handle: string | null
  is_index: boolean
  name: string | null
  namespace: string
  type: string | null
  updated_at: string
  value: string
  version: string
}

export type RequestCustomFieldBatchDelete = {
  custom_fields: CustomFieldBatchDeleteItem[]
}

export type CustomFieldItem = {
  handle: string
  namespace: string
  type: CustomFieldTypeEnum
  value: AnyRecord | null
}

export type RequestCreateCustomField = {
  handle: string
  is_index?: string | null
  name?: string | null
  namespace: string
  type: CustomFieldTypeEnum
  value: string
}

export type CustomField = {
  created_at: string
  custom_fieldable: AnyJsonRecord | null
  custom_fieldable_type: | 'address'
    | 'credit'
    | 'credit_definition'
    | 'location'
    | 'order'
    | 'organisation'
    | 'product'
    | 'product_list'
    | 'profile'
    | 'role_definition'
    | 'share'
    | 'status'
    | 'tenant'
    | 'transaction'
    | null
  handle: string | null
  is_index: boolean
  name: string | null
  namespace: string
  type: CustomFieldTypeEnum
  updated_at: string
  value: AnyRecord | null
  version: number | null
}

export type CustomFieldResponse = {
  data: CustomField[]
  meta?: PaginationMeta
  links?: PaginationLink
}
