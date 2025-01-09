import { CustomAttribute } from './custom-attribute'
import { Address } from '../address'
import { Identity } from '../identities'
import { Location } from '../location'
import { PaginationResponse } from '../pagination'
import { Region } from '../region'
import { Tier } from '../tier'
import { ProfileDatesAttribute } from './dates-attribute'
import { ProfileAppearance } from './appearance'
import { ProfileComms } from './comms'

export * from './aggregations'
export * from './appearance'
export * from './balances'
export * from './comms'
export * from './custom-attribute'
export * from './dates-attribute'
export * from './redeem'
export * from './batch'

export type ProfileType = 'temporary' | 'dependant' | 'incomplete' | 'pending' | 'system' | 'active' | 'deleted'

export type Profile = {
  id: string
  title: string | null
  first_name: string
  last_name: string
  email: string
  gender: 'male' | 'female' | 'witheld' | 'other' | null
  currency: 'string' | null
  joined_at: string | null
  mobile_phone: string | null
  mobile_phone_country: string | null
  mobile_phone_national: string | null
  mobile_phone_national_prefix: string | null
  mobile_phone_e164: string | null
  secondary_phone: string
  birth_day: number | null
  birth_month: number | null
  birth_year: number | null
  company: string | null
  occupation: string | null
  avatar_url: string | null
  is_completed: boolean
  joined_location_id: number
  joined_location: Location
  custom_fields: {[key: string]: any}
  preferred_location_id: number | null
  preferred_location: Location | null
  tier_handle: string | null
  tier: Tier | null
  birth_date: string | null
  birth_days: number | null
  birth_days_past: number | null
  next_birthday: string | null
  identities: Array<Identity>
  tags: Array<string>
  attributes: {
    comms: ProfileComms
    appearance: ProfileAppearance
    dates: ProfileDatesAttribute[]
  }
  statuses: Array<string>
  statuses_original: Array<string>
  custom_attributes: Array<CustomAttribute>
  address: Address
  addresses: Array<Address>
  reward_balance: number
  point_balance: number
  combined_balance_dollars: number
  point_balance_dollars: number
  profile_type: ProfileType
  region: Region | null
  regions: Array<Region>
  updated_at: string
  created_at: string
}

export type ProfileWebhook = Profile & {
  flattened_statuses: Array<string>
  flattened_tags: Array<string>
}

export type ProfileResponse = PaginationResponse & {
  data: Profile[]
}

export type ProfileInput = Partial<Omit<Profile, 'id' & 'created_at' & 'updated_at'>> & {
  first_name: Profile['first_name']
  last_name: Profile['last_name']
  email: Profile['email']
}
