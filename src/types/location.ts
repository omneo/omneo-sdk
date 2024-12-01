import { Address, AddressInput } from './address'
import { PaginationResponse } from './pagination'

export type NormalHour = {
  id: number
  location_id: number
  day_of_week: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
  open_at: string
  close_at: string
  created_at: string
  updated_at: string
}

export type SpecialHour = {
  id: number
  location_id: number
  name: string
  is_repeating: boolean
  open_at: string
  close_at: string
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
}

export type Location = {
  id: number
  type: string | null
  name: string | null
  description: string | null
  phone: string | null
  email: string
  timezone?: string
  external_id: string
  external_code?: string
  is_published: boolean
  is_permanently_closed: boolean
  address: Address | null
  normal_hours?: Array<NormalHour>
  special_hours?: Array<SpecialHour>
}

export type LocationInput = Omit<Location, 'id' | 'created_at' | 'updated_at'> & {
  type?: Location['type']
  name: Location['name']
  phone: Location['phone']
  email: Location['email']
  is_published: Location['is_published']
  description?: Location['description']
  timezone?: Location['timezone']
  external_id?: Location['external_id']
  external_code?: Location['external_code']
  is_permanently_closed?: Location['is_permanently_closed']
  address?: AddressInput
  normal_hours?: Array<Omit<NormalHour, 'id' | 'created_at' | 'updated_at'>>
  special_hours?: Array<Omit<SpecialHour, 'id' | 'created_at' | 'updated_at'>>
}
export type LocationResponse = PaginationResponse & {
  data: Location[]
}
