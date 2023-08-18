
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

export type AddressRequest = Partial<Address> & {
  address_line_1: string
  city: string,
  postcode: string,
  country: string,
  state: string
}

export type AddressUpdateRequest = {
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
}
