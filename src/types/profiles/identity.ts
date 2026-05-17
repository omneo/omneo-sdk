import type { ProfileWithoutIdentityAttributes } from './attribute'
import type { ProfileRegion } from './region'
import type { Address } from '../address'
import type { Location } from '../locations'
import type { Status } from '../statuses'
import type { Tier } from '../tiers'

export type RequestCreateIdentity = {
  handle: string
  identifier: string
  is_active?: boolean | null
  is_primary?: boolean | null
}

export type RequestUpdateIdentity = {
  identifier?: string
  is_active?: boolean | null
  is_primary?: boolean | null
}

export type ProfileWithoutIdentity = {
  address: Address
  addresses: Address[]
  attributes: ProfileWithoutIdentityAttributes
  avatar_url: string | null
  benefit_balance: string
  birth_date: string | null
  birth_day: string
  birth_days: string
  birth_days_past: string
  birth_month: string
  birth_year: string
  combined_balance_dollars: string
  company: string | null
  created_at: string
  currency: string | null
  custom_attributes: string
  email: string
  external_id: string
  first_name: string | null
  full_name: string | null
  gender: string | null
  id: number
  joined_at: string | null
  joined_location: Location
  joined_location_id: number
  last_name: string | null
  mobile_phone: string | null
  mobile_phone_country: string
  mobile_phone_e164: string
  mobile_phone_national: string
  mobile_phone_national_prefix: any[] | string
  next_birthday: string | null
  occupation: string | null
  point_balance: string
  point_balance_dollars: string
  preferred_location: Location
  preferred_location_id: number
  profile_type: string
  region: ProfileRegion | null
  regions: ProfileRegion[]
  reward_balance: string
  secondary_phone: string | null
  statuses: string[]
  statuses_original: Status[]
  tags: string[]
  tier: Tier
  tier_handle: string
  title: string | null
  updated_at: string
}
