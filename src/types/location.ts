import { Address } from './address'

export type NormalHour = {
  id: number
  location_id: number
  day_of_week: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
  open_at: string
  close_at: string
  created_at: Date
  updated_at: Date
}

export type SpecialHour = {
  id: number
  location_id: number
  name: string
  is_repeating: boolean
  open_at: string
  close_at: string
  start_at: Date
  end_at: Date
  created_at: Date
  updated_at: Date
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
