// Route category: connections

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { ConnectionDefinition } from './connection'
import type { ProductList } from './lists'
import type { Organisation } from './organisations'
import type { ProfileAppearanceAttribute, ProfileCommsAttribute, ProfileDatesAttribute } from './profiles'
import type { Identity } from './identities'

export type ConnectionStatusEnum = 'draft' | 'pending' | 'accepted' | 'rejected' | 'hold' | 'archived' | 'break'

export type ConnectionExternalIdTypeEnum = 'attributes_date' | 'interaction' | 'external' | 'transaction' | 'order' | 'product_list' | 'addresses'

export type RequestQueryConnection = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    description?: string | FilterOperator
    status?: string | FilterOperator
    connected_at?: string | FilterOperator
    disconnected_at?: string | FilterOperator
    disconnected_by?: string | FilterOperator
    connection_definition_id?: string | FilterOperator
    is_published?: string | FilterOperator
    is_default?: string | FilterOperator
    is_archived?: string | FilterOperator
    is_invalid?: string | FilterOperator
    is_primary?: string | FilterOperator
    sort_order?: string | FilterOperator
    external_id?: string | FilterOperator
    external_id_type?: string | FilterOperator
    meta?: string | FilterOperator
    notes?: string | FilterOperator
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

export type ConnectionConnected = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  birth_year: number | null
  birth_month: number | null
  birth_day: number | null

  attributes?: {
    appearance?: ProfileAppearanceAttribute
    comms?: ProfileCommsAttribute
    dates?: ProfileDatesAttribute[]
  }
  custom_attributes?: { [namespace: string]: { [handle: string]: any } }
  identities?: Identity[]
}

export type ConnectionConnector = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  birth_year: number | null
  birth_month: number | null
  birth_day: number | null

  attributes?: {
    appearance?: ProfileAppearanceAttribute
    comms?: ProfileCommsAttribute
    dates?: ProfileDatesAttribute[]
  }
  custom_attributes?: { [namespace: string]: { [handle: string]: any } }
  identities?: Identity[]
}

export type RequestCreateConnection = {
  connected_at?: string | null
  connected_id: string
  connection_definition_handle?: string | null
  connection_definition_id?: number | null
  connector_id: string
  description?: string | null
  disconnected_at?: string | null
  disconnected_by?: string
  external_id?: string | null
  external_id_type?: ConnectionExternalIdTypeEnum | null
  is_archived?: boolean | null
  is_default?: boolean | null
  is_invalid?: boolean | null
  is_primary?: boolean | null
  is_published?: boolean | null
  meta?: AnyJsonRecord | null
  name: string
  notes?: string | null
  organisation_id?: number | null
  sort_order?: number | null
  status: ConnectionStatusEnum
}

export type RequestUpdateConnection = {
  connected_at?: string | null
  description?: string | null
  disconnected_at?: string | null
  disconnected_by?: string
  external_id?: string | null
  external_id_type?: ConnectionExternalIdTypeEnum | null
  is_archived?: boolean | null
  is_default?: boolean | null
  is_invalid?: boolean | null
  is_primary?: boolean | null
  is_published?: boolean | null
  meta?: AnyJsonRecord | null
  name?: string
  notes?: string | null
  organisation_id?: number | null
  sort_order?: number | null
  status?: ConnectionStatusEnum
}

export type Connection = {
  connected: ConnectionConnected
  connected_at: string | null
  connected_id: string
  connector: ConnectionConnector
  connector_id: string
  created_at: string
  definition: ConnectionDefinition
  description: string | null
  disconnected_at: string | null
  disconnected_by: string | null
  external_id: string
  external_id_type: ConnectionExternalIdTypeEnum
  id: number
  is_archived: boolean
  is_default: boolean
  is_invalid: boolean
  is_primary: boolean
  is_published: boolean
  meta: AnyRecord | null
  name: string | null
  notes: string | null
  organisation: Organisation | null
  product_list?: ProductList
  sort_order: number | null
  status: ConnectionStatusEnum
  updated_at: string
}

export type ConnectionResponse = {
  data: Connection[]
  meta?: PaginationMeta
  links?: PaginationLink
}
