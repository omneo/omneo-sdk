import { Address, AddressInput } from './address'
import { Location } from './location'
import { CustomField, CreateCustomFieldInput } from './custom-field'
import { PaginationResponse } from './pagination'

export type Organisation = {
  id: number
  name: string
  handle: string
  description: string | null
  short_description: string | null
  icon: string | null
  image_url: string | null
  notes: string | null
  type: string | null
  status: string | null
  is_tenant: boolean
  is_active: boolean
  phone: string | null
  email: string | null
  secondary_phone: string | null
  domain: string | null
  authorised_domains: string[] | null
  meta: { [key: string]: any } | null
  locations: Location[]
  address: Address
  custom_fields: {
    [namespace: string]: {
      [handle: string]: CustomField['value']
    }
  }
  created_at: string | null
  updated_at: string | null
}

export type OrganisationResponse = PaginationResponse & {
  data: Organisation[]
}

export type OrganisationType = 'company' | 'stockist' | 'brand' | 'organisation' | 'group' | 'school' | 'club' | 'other'

export type CreateOrganisationInput = {
  name: string
  handle: string
  type: OrganisationType
  description?: string | null
  short_description?: string | null
  icon?: string | null
  image_url?: string | null
  notes?: string | null
  status?: string | null
  is_tenant?: boolean | null
  is_active?: boolean | null
  phone?: string | null
  email?: string | null
  secondary_phone?: string | null
  domain?: string | null
  authorised_domains?: string | null
  meta?: { [key: string]: any } | null
  address?: AddressInput | null
  custom_fields?: Pick<CreateCustomFieldInput, 'namespace' | 'handle' | 'type' | 'value'>[]
  locations?: number[] | null
}

export type UpdateOrganisationInput = Omit<Partial<CreateOrganisationInput>, 'handle'>

export type CreateOrganisationProfileInput = {
  profile_id: string
  role_definition_id?: number | null
  expires_at?: string | null
  is_active?: boolean | null
}
