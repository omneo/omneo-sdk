// Route category: audits

import type { AnyJsonRecord, AnyRecord, FilterOperator, ProfileSummary } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateAudit = {
  auditable_id?: number | null
  auditable_type: string
  event: string
  ip_address?: string | null
  location_id?: number | null
  new_values?: AnyRecord | null
  old_values?: AnyRecord | null
  profile_id?: string | null
  staff_id?: string | null
  url?: string | null
  user_agent?: string | null
}

export type RequestUpdateAudit = {
  auditable_id?: number | null
  auditable_type?: string
  event?: string
  ip_address?: string | null
  location_id?: number | null
  new_values?: AnyRecord | null
  old_values?: AnyRecord | null
  profile_id?: string | null
  staff_id?: string | null
  url?: string | null
  user_agent?: string | null
}

export type RequestQueryAudit = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    location_id?: string | FilterOperator
    staff_id?: string | FilterOperator
    auditable_id?: string | FilterOperator
    auditable_type?: string | FilterOperator
    event?: string | FilterOperator
    url?: string | FilterOperator
    user_id?: string | FilterOperator
    user_agent?: string | FilterOperator
    token_name?: string | FilterOperator
    created_at?: string | FilterOperator
    updated_at?: string | FilterOperator
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

export type AuditLocation = {
  id: number
  name: string | null
  handle: string | null
  external_id: string
}

export type Audit = {
  auditable_id: number
  auditable_type: string
  created_at: string
  event: string
  id: number
  ip_address: string | null
  location: AuditLocation | null
  location_id: number
  new_values: AnyJsonRecord | null
  old_values: AnyJsonRecord | null
  profile_id: string
  staff: ProfileSummary | null
  staff_id: string
  token_name: string | null
  updated_at: string
  url: string | null
  user_agent: string | null
  user_id: number
}

export type AuditResponse = {
  data: Audit[]
  meta?: PaginationMeta
  links?: PaginationLink
}
