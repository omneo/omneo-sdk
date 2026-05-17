// Route category: organisations

import type { AnyJsonRecord, AnyRecord, FilterOperator } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'
import type { Location } from './locations'
import type { CustomFieldItem } from './custom-fields'
import type { Address, LocationsAddress } from './address'
export type OrganisationTypeEnum = 'company' | 'stockist' | 'brand' | 'organisation' | 'group' | 'school' | 'club' | 'other'

export type OrganisationAddress = LocationsAddress

export type RequestCreateOrganisationProfile = {
  expires_at?: string | null
  is_active?: boolean | null
  profile_id: string
  role_definition_id?: number | null
}

export type RequestQueryOrganisation = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    description?: string | FilterOperator
    short_description?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    notes?: string | FilterOperator
    type?: string | FilterOperator
    status?: string | FilterOperator
    is_tenant?: string | FilterOperator
    is_active?: string | FilterOperator
    phone?: string | FilterOperator
    email?: string | FilterOperator
    secondary_phone?: string | FilterOperator
    domain?: string | FilterOperator
    authorised_domains?: string | FilterOperator
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

export type OrganisationCustomFields = {
  [namespace: string]: {
    [handle: string]:
      | number
      | string
      | boolean
      | any[]
      | AnyJsonRecord
      | null
  }
}

export type ProfileOrganisationRoleDefinition = {
  id: number
  name: string | null
  handle: string | null
  description: string | null
}

export type RequestCreateOrganisation = {
  address?: OrganisationAddress | null
  authorised_domains?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  domain?: string | null
  email?: string | null
  handle: string
  icon?: string | null
  image_url?: string | null
  is_active?: boolean | null
  is_tenant?: boolean | null
  locations?: number[] | null
  meta?: AnyJsonRecord | null
  name: string
  notes?: string | null
  phone?: string | null
  secondary_phone?: string | null
  short_description?: string | null
  status?: string | null
  type: OrganisationTypeEnum
}

export type RequestUpdateOrganisation = {
  address?: OrganisationAddress | null
  authorised_domains?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  domain?: string | null
  email?: string | null
  icon?: string | null
  image_url?: string | null
  is_active?: boolean | null
  is_tenant?: boolean | null
  locations?: number[] | null
  meta?: AnyJsonRecord | null
  name?: string
  notes?: string | null
  phone?: string | null
  secondary_phone?: string | null
  short_description?: string | null
  status?: string | null
  type?: OrganisationTypeEnum
}

export type Organisation = {
  address: Address
  authorised_domains: AnyJsonRecord | null
  created_at: string | null
  custom_fields: OrganisationCustomFields
  description: string | null
  domain: string | null
  email: string
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  is_active: boolean
  is_tenant: boolean
  locations: Location[]
  meta: AnyRecord | null
  name: string | null
  notes: string | null
  phone: string | null
  secondary_phone: string | null
  short_description: string | null
  status: string | null
  type: OrganisationTypeEnum
  updated_at: string | null
}

export type ProfileOrganisation = {
  authorised_domains: AnyRecord | null
  created_at: string | null
  description: string | null
  domain: string
  email: string
  expires_at: string | null
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  is_active: boolean
  is_tenant: boolean
  name: string | null
  notes: string
  phone: string
  role_definition: ProfileOrganisationRoleDefinition | null
  secondary_phone: string | null
  short_description: string | null
  status: string
  type: string | null
  updated_at: string | null
}

export type OrganisationResponse = {
  data: Organisation[]
  meta?: PaginationMeta
  links?: PaginationLink
}
