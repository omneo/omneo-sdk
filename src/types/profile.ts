import { Address } from './address'
import { Identity } from './identities'
import { Location } from './location'
import { Region } from './region'
import { Tier } from './tier'

export type CommsChannel = 'email' | 'sms' | 'post' | 'push' | 'phone'

export type CustomAttribute = {
  id: number,
  profile_id: string
  namespace: string
  handle: string
  type: 'json' | 'integer' | 'string'
  value: any,
  created_at: Date
  updated_at: Date
}

export type ProfileBalances = {
  reward_balance: number
  point_balance: number
  point_balance_dollars: number
  benefit_balance: number
  combined_balance_dollars: number
}

export type ProfileComms = {
  profile_id: string
  email_optout: Boolean | null
  push_optout: Boolean | null
  sms_optout: Boolean | null
  phone_optout: Boolean | null
  post_optout: Boolean | null
  email_bounced: Boolean | null
  push_bounced: Boolean | null
  sms_bounced: Boolean | null
  phone_bounced: Boolean | null
  post_bounced: Boolean | null
  sms_promo: Boolean | null
  push_promo: Boolean | null
  email_promo: Boolean | null
  phone_promo: Boolean | null
  post_promo: Boolean | null
  email_discover: Boolean | null
  email_benefits: Boolean | null
  email_reminders: Boolean | null
  email_account: Boolean | null
  email_bookings: Boolean | null
  email_feedback: Boolean | null
  email_location: Boolean | null
  email_service: Boolean | null
  sms_discover: Boolean | null
  sms_benefits: Boolean | null
  sms_reminders: Boolean | null
  sms_account: Boolean | null
  sms_bookings: Boolean | null
  sms_feedback: Boolean | null
  sms_location: Boolean | null
  sms_service: Boolean | null
  push_discover: Boolean | null
  push_benefits: Boolean | null
  push_reminders: Boolean | null
  push_account: Boolean | null
  push_bookings: Boolean | null
  push_feedback: Boolean | null
  push_location: Boolean | null
  push_service: Boolean | null
  phone_discover: Boolean | null
  phone_benefits: Boolean | null
  phone_reminders: Boolean | null
  phone_account: Boolean | null
  phone_bookings: Boolean | null
  phone_feedback: Boolean | null
  phone_location: Boolean | null
  phone_service: Boolean | null
  post_discover: Boolean | null
  post_benefits: Boolean | null
  post_reminders: Boolean | null
  post_account: Boolean | null
  post_bookings: Boolean | null
  post_feedback: Boolean | null
  post_location: Boolean | null
  post_service: Boolean | null
  email_verification: 'sent' | 'not_sent'
  sms_verification: 'sent' | 'not_sent'
  phone_verification: 'sent' | 'not_sent'
  post_verification: 'sent' | 'not_sent'
  terms_accepted_at: Boolean | null | null
  terms_accepted_version: Boolean | null | null
  created_at: Date
  updated_at: Date
}

export type ProfileAppearance = {
  profile_id: string
  hair_colour: string | null
  hair_length: string | null
  shape_body: string | null
  shape_face: string | null
  size_cup: string | null
  size_hat: string | null
  size_formal_jacket: string | null
  size_formal_jacket_length: string | null
  size_formal_shirt: string | null
  size_formal_shirt_fit: string | null
  size_formal_trouser: string | null
  size_formal_trouser_drop: string | null
  size_formal_trouser_leg: string | null
  size_jacket: string | null
  size_pant: string | null
  size_shoe: string | null
  size_type_age: string | null
  size_type_region: string | null
  size_top: string | null
  size_gloves: string | null
  size_swimwear_top: string | null
  size_swimwear_bottom: string | null
  size_swimwear_cup: string | null
  size_dress: string | null
  skin_type: string | null
  measurement_arm: string | null
  measurement_arm_inside: string | null
  measurement_bust: string | null
  measurement_chest: string | null
  measurement_foot_length: string | null
  measurement_head: string | null
  measurement_height: string | null
  measurement_hip: string | null
  measurement_leg_inside: string | null
  measurement_leg_outside: string | null
  measurement_neck: string | null
  measurement_neck_to_wrist: string | null
  measurement_shoulders: string | null
  measurement_waist: string | null
  measurement_weight: string | null
  brow_colour: string | null
  eye_colour: string | null
  measurement_hand_right_thumb: string | null
  measurement_hand_right_index: string | null
  measurement_hand_right_middle: string | null
  measurement_hand_right_ring: string | null
  measurement_hand_right_pinky: string | null
  measurement_hand_left_thumb: string | null
  measurement_hand_left_index: string | null
  measurement_hand_left_middle: string | null
  measurement_hand_left_ring: string | null
  measurement_hand_left_pinky: string | null
  measurement_ear_helix: string | null
  measurement_ear_forward_helix: string | null
  measurement_ear_flat: string | null
  measurement_ear_conch: string | null
  measurement_ear_tragus: string | null
  measurement_ear_lobe: string | null
  created_at: Date
  updated_at: Date
}

export type ProfileDates = {}

export type Profile = {
  id: string
  title: string
  first_name: string
  last_name: string
  email: string
  gender: 'male' | 'female' | 'witheld' | 'other'
  currency: 'string' | null
  joined_at: Date
  mobile_phone: string | null
  mobile_phone_country: string | null
  mobile_phone_national: string | null
  mobile_phone_national_prefix: string | null
  mobile_phone_e164: string | null
  secondary_phone: string
  birth_day: number
  birth_month: number
  birth_year: number
  company: string
  occupation: string
  avatar_url: string
  is_completed: boolean
  joined_location_id: number
  joined_location: Location
  custom_fields: {[key: string]: any}
  preferred_location_id: number
  preferred_location: Location
  tier_handle: string | null
  tier: Tier | null
  birth_date: string
  birth_days: number
  birth_days_past: number
  next_birthday: Date
  identities: Array<Identity>
  tags: Array<string>
  attributes: {
    comms: ProfileComms
    appearance: ProfileAppearance
    dates: ProfileDates
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
  profile_type: 'pending' | 'temporary' | 'active' | 'deleted'
  region: Region
  regions: Array<Region>
  updated_at: Date
  created_at: Date
}

export type ProfileWebhook = Profile & {
  flattened_statuses: Array<string>
  flattened_tags: Array<string>
}

export type Redeem = {
    id: number
    profile_id: string
    total_localised: number
    total: number
    balances: ProfileBalances
    meta: { [key: string]: any }
    created_at: Date
    updated_at: Date
}

export type Aggregations = {
  profile_id: string
  shop_days: number
  spend_12m: number
  spend_12m_now: Date | null
  spend_all: number
  spend_atv_12m: number
  spend_atv_all: number
  discount_avg: number
  spend_first_date: Date | null
  spend_last_date: Date | null
  dimension_frequency: 'F0' | 'F1' | 'F2' | 'FL' | 'FH'
  /*
    dimension_frequency
    * F0 - never shopped
    * F1 - 1 order ever
    * F2 - 2 order ever
    * FL - > 30d between orders (+3 lifetime)
    * FH - < 30d between orders (+3 lifetime)
  */
  dimension_recency: 'RR' | 'RL' | 'RI' | 'RA' | 'RC'
  /*
    dimension_recency
    * RR last shop >= 60 months ago
    * RL last shop >= 24 months ago and less than 60 months ago
    * RI last shop >= 12 months ago and less than 24 months ago
    * RA last shop>= 6 months ago and less than 12 months ago
    * RS last shop >= 3 months ago and less than 6 months ago
    * RC If none of the above are true
  */
  dimension_join: 'JN' | 'JC' | `J${number}`
  /*
    dimension_join
      * JN Join New (where join date is less than or equal to 90 days ago)
      * JC Join Current (where join date is less than or equal to 365 days ago)
      * J1 (effectively represents 1 year, where join date is greater than 365 days [1yr] but less or equal to 730 days
      * [2yrs]) J2 (effectively represents 2 years, where join date is greater than 730 days [2yrs] but less or equal to
      * 1095 days [3yrs] etc per year anniversary
  */
  channel: 'CO' | 'CF' | 'CM'
  /*
   channel (aggregate transaction 'systems' handles)
   * CO Has transacted both 'pos' and 'web' transactions
   * CM Has only transacted 'web' transactions
   * CF Has only transacted 'pos' transactions
  */
  shop_count: number
  store_join: Location | null
  likely_country: string
  likely_country_score: number
  purchased_brands: Array<String>
  total_shop_days: number | null
  first_shop_days: number | null
  second_shop_days: number | null
  latest_shop_days: number | null
  average_shop_days: number | null
  second_shop_date: number | null
  previous_shop_date: number | null
  at_risk_date: Date | null
  most_transacted_location: Location | null
  latest_shop_spend: number | null
  latest_shop_currency: string | null
  latest_transacted_location: Location | null
  transacted_locations: string | null
  likely_country_iso: string | null
  likely_country_iso_score: string | null
  likely_state_iso: string | null
  likely_state_iso_score: number | null
  likely_region: string | null
  likely_region_score: number | null
}
