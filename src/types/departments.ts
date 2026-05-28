// Route category: departments

import type { FilterOperator, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { DepartmentBrand } from './brands'

export type RequestCreateDepartment = {
  brand_id: number
  description?: string | null
  external_code?: string | null
  external_id?: string | null
  handle: string
  image_url?: string | null
  internal_note?: string | null
  location_id?: number | null
  meta?: AnyRecord | null
  name: string
  short_description?: string | null
  url?: string | null
}

export type RequestUpdateDepartment = {
  brand_id?: number
  description?: string | null
  external_code?: string | null
  external_id?: string | null
  image_url?: string | null
  internal_note?: string | null
  location_id?: number | null
  meta?: AnyRecord | null
  name?: string
  short_description?: string | null
  url?: string | null
}

export type RequestQueryDepartment = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    brand_id?: string | FilterOperator
    external_id?: string | FilterOperator
    external_code?: string | FilterOperator
    description?: string | FilterOperator
    short_description?: string | FilterOperator
    location_id?: string | FilterOperator
    url?: string | FilterOperator
    image_url?: string | FilterOperator
    internal_note?: string | FilterOperator
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
  [key: string]: any
}

export type Department = {
  brand: DepartmentBrand
  brand_id: number
  created_at: string
  description: string | null
  external_code: string | null
  external_id: string
  handle: string | null
  id: number
  image_url: string | null
  internal_note: string | null
  location_id: number
  meta: AnyRecord | null
  name: string | null
  short_description: string | null
  updated_at: string
  url: string | null
}

export type DepartmentResponse = {
  data: Department[]
  meta?: PaginationMeta
  links?: PaginationLink
}
