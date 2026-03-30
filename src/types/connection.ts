import { Identity } from './identities'
import { PaginationResponse } from './pagination'
import { ProductList } from './product'
import { Profile, ProfileAppearance, ProfileComms, ProfileDatesAttribute } from './profile'

export type ConnectionStatuses = 'draft' | 'pending' | 'accepted' | 'rejected' | 'hold' | 'archived' | 'break'

export type ConnectionDefinitionType =
  | 'brand'
  | 'referral'
  | 'dependant'
  | 'stylist'
  | 'company'
  | 'partner'
  | 'household'
  | 'advisor'
  | 'staff_join'
  | 'staff_preferred'
  | 'gift'
  | 'external'
  | 'other'

export type GetConnectionInputParams = {
  type?: 'connected' | 'connector',
  [key: string]: any
}

export type ConnectionInput = {
    name: string
    connection_definition_id?: number
    connection_definition_handle?: string
    description?: string | null
    connected_id: string
    connector_id: string
    status: ConnectionStatuses
    disconnected_by?: string | null
    connected_at?: string | null
    disconnected_at?: string | null
    is_published?: boolean | null
    is_default?: boolean | null
    is_archived?: boolean | null
    is_invalid?: boolean | null
    is_primary?: boolean | null
    sort_order?: number | null
    meta?: { [key: string]: any } | null
    notes?: string | null
}

type ConnectionExternalIdType =
  | 'attributes_date'
  | 'interaction'
  | 'external'
  | 'transaction'
  | 'order'
  | 'product_list'
  | 'addresses'

type UpdateConnectionEditable = Omit<
  ConnectionInput,
  'connected_id' | 'connector_id' | 'connection_definition_id' | 'connection_definition_handle'
> & {
  external_id?: string | null
  external_id_type?: ConnectionExternalIdType | null
  organisation_id?: number | null
}

export type UpdateConnectionInput = Partial<UpdateConnectionEditable>

export type ConnectionDefinition = {
  id: number
  name: string
  handle: string
  short_description: string | null
  description?: string | null
  icon: string | null
  cover: string | null
  internal_notes: string | null
  type: string
  tenant: string | null
  start_date_global: string | null
  end_date_global: string | null
  end_date_duration: number | null
  meta: string | { [key: string]: any }
  shareable_attributes: Array<keyof Profile>
  connector_condition: { [key: string]: any } | null
  connected_condition: { [key: string]: any } | null
  connector_can_break: boolean | null
  connected_can_break: boolean | null
  is_published: boolean
  is_pending: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
}

export type ConnectionProfileData = {
  id: Profile['id']
  first_name: Profile['first_name']
  last_name: Profile['last_name']
  email: Profile['email']
  birth_year: Profile['birth_year']
  birth_month: Profile['birth_month']
  birth_day: Profile['birth_day']
  attributes?: {
    comms?: ProfileComms
    appearance?: ProfileAppearance
    dates?: ProfileDatesAttribute
  }
  identities?: Identity[]
  custom_attributes?: {
    [namespace:string]: {
      [handle:string]: any
    }
  }
}

export type Connection = {
  id: number
  name: string
  description: string | null
  definition: ConnectionDefinition
  connected_id: string
  connected: ConnectionProfileData
  connector_id: string
  connector: ConnectionProfileData
  status: ConnectionStatuses
  disconnected_by: string | null
  connected_at: string
  disconnected_at: string
  is_published: boolean
  is_archived: boolean
  is_default: boolean
  is_invalid: boolean
  is_primary: boolean
  sort_order: number
  meta: { [key: string]: any } | null
  notes: string | null
  external_id: string | null
  external_id_type: string | null
  organisation: { [key: string]: any } | null
  created_at: string
  updated_at: string
  product_lists?: ProductList[]
}

export type ConnectionResponse = PaginationResponse & {
  data: Connection[]
}

export type ConnectionDefinitionResponse = PaginationResponse & {
  data: ConnectionDefinition[]
}

type ConnectionDefinitionEditable = Omit<
  ConnectionDefinition,
  'id' | 'created_at' | 'updated_at'
> & {
  type: ConnectionDefinitionType
}

type ConnectionDefinitionRequiredFields = 'name' | 'handle' | 'type'

export type CreateConnectionDefinitionInput =
  Required<Pick<ConnectionDefinitionEditable, ConnectionDefinitionRequiredFields>>
  & Partial<Omit<ConnectionDefinitionEditable, ConnectionDefinitionRequiredFields>>

type ConnectionDefinitionUpdateEditable = Omit<ConnectionDefinitionEditable, 'handle'>

export type UpdateConnectionDefinitionInput = Partial<ConnectionDefinitionUpdateEditable>
