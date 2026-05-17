// Route category: connection

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Profile } from './profiles/profile'

export type ConnectionDefinitionTypeEnum = 'brand' | 'referral' | 'dependant' | 'stylist' | 'company' | 'partner' | 'household' | 'advisor' | 'staff_join' | 'staff_preferred' | 'gift' | 'external' | 'other'

export type RequestQueryConnectionDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    short_description?: string | FilterOperator
    description?: string | FilterOperator
    icon?: string | FilterOperator
    cover?: string | FilterOperator
    internal_notes?: string | FilterOperator
    type?: string | FilterOperator
    tenant?: string | FilterOperator
    start_date_global?: string | FilterOperator
    end_date_global?: string | FilterOperator
    end_date_duration?: string | FilterOperator
    meta?: string | FilterOperator
    shareable_attributes?: string | FilterOperator
    connector_condition?: string | FilterOperator
    connected_condition?: string | FilterOperator
    connector_can_break?: string | FilterOperator
    connected_can_break?: string | FilterOperator
    is_published?: string | FilterOperator
    is_pending?: string | FilterOperator
    is_archived?: string | FilterOperator
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

export type RequestCreateConnectionDefinition = {
  connected_can_break?: boolean | null
  connected_condition?: string[] | null
  connector_can_break?: boolean | null
  connector_condition?: string[] | null
  cover?: string | null
  description?: string | null
  end_date_duration?: number | null
  end_date_global?: string | null
  handle: string
  icon?: string | null
  internal_notes?: string | null
  is_archived?: boolean | null
  is_pending?: boolean | null
  is_published?: boolean | null
  meta?: AnyJsonRecord | null
  name: string
  shareable_attributes?: string[] | null
  short_description?: string | null
  start_date_global?: string | null
  tenant?: string | null
  type: ConnectionDefinitionTypeEnum
}

export type RequestUpdateConnectionDefinition = {
  connected_can_break?: boolean | null
  connected_condition?: string[] | null
  connector_can_break?: boolean | null
  connector_condition?: string[] | null
  cover?: string | null
  description?: string | null
  end_date_duration?: number | null
  end_date_global?: string | null
  icon?: string | null
  internal_notes?: string | null
  is_archived?: boolean | null
  is_pending?: boolean | null
  is_published?: boolean | null
  meta?: AnyJsonRecord | null
  name?: string
  shareable_attributes?: string[] | null
  short_description?: string | null
  start_date_global?: string | null
  tenant?: string | null
  type?: ConnectionDefinitionTypeEnum
}

export type ConnectionDefinition = {
  connected_can_break: boolean
  connected_condition: AnyJsonRecord | null
  connector_can_break: boolean
  connector_condition: AnyJsonRecord | null
  cover: string | null
  created_at: string
  description: string | null
  end_date_duration: number | null
  end_date_global: string | null
  handle: string | null
  icon: string | null
  id: number
  internal_notes: string | null
  is_archived: boolean
  is_pending: boolean
  is_published: boolean
  meta: AnyRecord | null
  name: string | null
  shareable_attributes: Array<keyof Profile>
  short_description: string | null
  start_date_global: string | null
  tenant: string | null
  type: ConnectionDefinitionTypeEnum
  updated_at: string
}

export type ConnectionDefinitionResponse = {
  data: ConnectionDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}
