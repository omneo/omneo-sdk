
export type Address = {
  id: string
  address_line_1: string
  address_line_2: string
  address_line_3: string
  company: string
  is_default: Boolean
  latitude: string
  longitude: string
  city: string
  state: string
  postcode: string
  country: string
  iso: string
  iso_state: string
  notes: string
  meta?: {[key: string]: any}
}

export type AddressInput = Partial<Address> & {
  address_line_1: string
  city: string,
  postcode: string,
  country: string,
  state: string
}

export type AddressUpdateInput = {
  address_line_1?: string
  address_line_2?: string
  address_line_3?: string
  company?: string
  is_default?: Boolean
  latitude?: string
  longitude?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
  iso?: string
  iso_state?: string
  notes?: string
  external_id?: string
}

export type AddressWebhook = Address & {
  external_id: string
  resource_owner_id: string
  resource_owner_type: string
  name: string
  type: string
  phone: string
  profile: {
    id: string
    email: string
  }
}
