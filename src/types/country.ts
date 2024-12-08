import { PaginationResponse } from './pagination'

export type CountryState = {
  id: string
  name: string
  type: string
  iso: string
  iso_2_country: string
  iso_2_country_state_code: string
  sort_order: number | null
  created_at: string
  updated_at: string
}

export type Country = {
  id: string
  name: string
  iso_2: string
  iso_3: string
  iso_numeric: string
  sort_order: number | null
  states: CountryState[]
  created_at: string
  updated_at: string
}

export type CountryResponse = PaginationResponse & {
  data: Country[]
}

export type CountryInput = {
  name: string
  iso_2: string
  iso_3: string
  iso_numeric: string
  sort_order?: number | null
}
