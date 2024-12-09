import { Country } from './country'
import { PaginationResponse } from './pagination'

export type Region = {
  id: number
  name: string
  handle: string
  countries: Country[]
  is_active?: boolean
  country?: string | null
  state?: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export type RegionResponse = PaginationResponse & {
  data: Region[]
}

export type RegionInput = {
  name?: string
  countries?: { iso_2: string } []
}
