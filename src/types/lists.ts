// Route category: lists

import type { AnyJsonRecord, AnyRecord, FilterOperator, PeriodType } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { CustomFieldRaw } from './custom-fields'
import type { Identity } from './identities'
import type { ProductListItem } from './list'
import type { Organisation } from './organisations'
import type { Profile } from './profiles'
import type { Address } from './address'

export type RequestCreateListDefinition = {
  allow_custom_product?: boolean | null
  allow_delete?: boolean | null
  allow_edit?: boolean | null
  allow_new?: boolean | null
  allow_quantity?: boolean | null
  allow_reserve?: boolean | null
  allow_share?: boolean | null
  cover?: string | null
  description?: string | null
  handle: string
  icon?: string | null
  is_active?: boolean | null
  is_published?: boolean | null
  meta?: AnyJsonRecord | null
  name: string
  organisation_id?: number | null
  reservation_absolute_expiry: string | null
  reservation_expiry_target_id?: number | null
  reservation_notify_remind_offset_days?: number | null
  reservation_notify_remind_offset_hours?: number | null
  reservation_notify_reserved_offset_days?: number | null
  reservation_notify_reserved_offset_hours?: number | null
  reservation_period?: number
  reservation_period_type?: PeriodType
  reservation_remind_target_id?: number | null
  reservation_reserved_target_id?: number | null
  short_description?: string | null
  tags?: string[]
  timezone?: string
  type: string
}

export type RequestUpdateListDefinition = {
  allow_custom_product?: boolean | null
  allow_delete?: boolean | null
  allow_edit?: boolean | null
  allow_new?: boolean | null
  allow_quantity?: boolean | null
  allow_reserve?: boolean | null
  allow_share?: boolean | null
  cover?: string | null
  description?: string | null
  icon?: string | null
  is_active?: boolean | null
  is_published?: boolean | null
  meta?: AnyJsonRecord | null
  name?: string
  organisation_id?: number | null
  reservation_absolute_expiry: string | null
  reservation_expiry_target_id?: number | null
  reservation_notify_remind_offset_days?: number | null
  reservation_notify_remind_offset_hours?: number | null
  reservation_notify_reserved_offset_days?: number | null
  reservation_notify_reserved_offset_hours?: number | null
  reservation_period?: number
  reservation_period_type?: PeriodType
  reservation_remind_target_id?: number | null
  reservation_reserved_target_id?: number | null
  short_description?: string | null
  tags?: string[]
  timezone?: string
  type?: string
}

export type RequestQueryListDefinition = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    is_published?: string | FilterOperator
    is_active?: string | FilterOperator
    handle?: string | FilterOperator
    allow_share?: string | FilterOperator
    type?: string | FilterOperator
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

export type ListDefinition = {
  allow_custom_product: boolean
  allow_delete: boolean
  allow_edit: boolean
  allow_new: boolean
  allow_quantity: boolean
  allow_reserve: boolean
  allow_share: boolean
  cover: string | null
  description: string | null
  handle: string | null
  icon: string | null
  id: number
  is_active: boolean
  is_published: boolean
  meta: AnyRecord | null
  name: string | null
  organisation: Organisation | null
  reservation_absolute_expiry: string | null
  reservation_expiry_target_id: number
  reservation_notify_remind_offset_days: number | null
  reservation_notify_remind_offset_hours: number | null
  reservation_notify_reserved_offset_days: number | null
  reservation_notify_reserved_offset_hours: number | null
  reservation_period: number
  reservation_period_type: PeriodType
  reservation_remind_target_id: number
  reservation_reserved_target_id: number
  short_description: string | null
  tags: string[]
  timezone: string | null
  type: string | null
}

export type ProductListProfile = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
}

export type ProductListLocation = {
  id: number
  type: string | null
  name: string | null
  description: string | null
  phone: string | null
  email: string | null
  external_id: string | null
  is_published: boolean
  is_permanently_closed: boolean
  address: Address | null
}

export type ProductListStaff = {
  id: string
  full_name: string | null
  email: string
  identities: Identity[]
}

export type ProductListNoPIILocation = {
  id: number
  type: string | null
  name: string | null
  description: string | null
  phone: string | null
  email: string | null
  external_id: string | null
  is_published: boolean
  is_permanently_closed: boolean
  address: {
    street: string | null
    city: string | null
    state: string | null
    postal_code: string | null
    country: string | null
  } | null
}

export type ProductListShare = {
  created_at: string
  handle: string | null
  id: number
  product_list_id: number
  profile_id: string
  updated_at: string
}

export type ListDefinitionResponse = {
  data: ListDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type ProductList = {
  created_at: string
  custom_date: string
  custom_fields?: CustomFieldRaw[]
  definition?: ListDefinition | null
  description: string | null
  handle: string | null
  id: number
  is_shared?: boolean
  items?: ProductListItem[]
  location?: ProductListLocation | null
  meta: AnyRecord | null
  name: string | null
  organisation?: Organisation | null
  profile: ProductListProfile | null
  profile_id: string
  shares?: ProductListShare[]
  sort_order: number | null
  staff?: ProductListStaff | null
  tags?: string[]
  updated_at: string
}

export type ProductListNoPII = {
  created_at: string
  custom_date: string
  custom_fields: CustomFieldRaw[]
  definition: ListDefinition | null
  description: string | null
  handle: string | null
  id: number
  is_shared: boolean
  items: ProductListItem[]
  location: ProductListNoPIILocation | null
  meta: AnyRecord | null
  name: string | null
  organisation: Organisation | null
  profile_id: string
  shares: ProductListShare[]
  sort_order: number | null
  tags: string[]
  updated_at: string
}

export type ProductListShareNested = {
  created_at: string
  handle: string | null
  id: number
  list: ProductList
  profile?: Profile
  updated_at: string
}

export type ProductListShareNestedNoProfile = {
  created_at: string
  handle: string | null
  id: number
  list: ProductListNoPII
  profile_id: string
  updated_at: string
}

export type ProductListShareNestedResponse = {
  data: ProductListShareNested[]
}
