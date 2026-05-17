// Address type

import type { AnyJsonRecord, AnyRecord, CustomFieldsGrouped } from './common'
import type { CustomFieldItem, CustomFieldTypeEnum } from './custom-fields'
import type { PaginationLink, PaginationMeta } from './pagination'
export type LocationsAddress = {
  address_line_1: string
  address_line_2?: string | null
  address_line_3?: string | null
  city: string
  company?: string | null
  country: string
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  latitude?: number | null
  longitude?: number | null
  notes?: string | null
  postcode: string
  state: string
}

export type AddressTypeEnum = 'home' | 'business' | 'billing' | 'holiday' | 'hotel' | 'recipient' | 'other'

export type UpsertAddressCustomFieldsItem = {
  handle: string
  is_index: boolean
  namespace: string
  type: CustomFieldTypeEnum
  value: string
}

export type Address = {
  address_line_1: string
  address_line_2: string | null
  address_line_3: string | null
  city: string
  company: string | null
  country: string
  created_at: string
  custom_fields: CustomFieldsGrouped
  external_id: string
  id: number
  is_default: boolean
  iso: string | null
  iso_state: string | null
  latitude: number | null
  longitude: number | null
  meta: AnyRecord | null
  name: string | null
  notes: string | null
  phone: string | null
  postcode: string
  profile_id: string
  state: string | null
  type: AddressTypeEnum | null
  updated_at: string
}

export type RequestCreateAddress = {
  address_line_1: string
  address_line_2?: string | null
  address_line_3?: string | null
  city: string
  company?: string | null
  country: string
  custom_fields?: CustomFieldItem[]
  external_id?: string | null
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  meta?: AnyJsonRecord | null
  name?: string | null
  notes?: string | null
  phone?: string | null
  postcode: string
  state?: string
  type?: AddressTypeEnum | null
}

export type RequestUpdateAddress = {
  address_line_1?: string
  address_line_2?: string | null
  address_line_3?: string | null
  city?: string
  company?: string | null
  country?: string
  external_id?: string | null
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  meta?: AnyJsonRecord | null
  name?: string | null
  notes?: string | null
  phone?: string | null
  postcode?: string
  state?: string
  type?: AddressTypeEnum | null
}

export type RequestUpsertAddress = {
  address_line_1: string
  address_line_2?: string | null
  address_line_3?: string | null
  city: string
  company?: string | null
  country: string
  custom_fields?: UpsertAddressCustomFieldsItem[]
  external_id?: string | null
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  meta?: AnyJsonRecord | null
  name?: string | null
  notes?: string | null
  phone?: string
  postcode: string
  state?: string
  type?: AddressTypeEnum | null
}

export type ProfileAddressResponse = {
  data: Address[]
  meta?: PaginationMeta
  links?: PaginationLink
}
