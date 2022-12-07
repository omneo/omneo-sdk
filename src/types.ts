export type OmneoConfig = {}

export type OmneoClassOptions = {
  config?: OmneoConfig,
  tenant: string,
  token: string
}

export type Identity = {
  id: string
  merged_from: string | null
  is_primary: boolean
  is_active: boolean
  namespace: string,
  identifier: string,
  handle: string,
  created_at: Date,
  updated_at: Date
}

export type Transaction = {
  id: string
}

export type IdentityRequest = {
  namespace: string,
  handle: string,
  identifier: string
}

export type Address = {
  address_line_1: string,
  address_line_2: string,
  address_line_3: string,
  company: string,
  is_default: Boolean,
  latitude: string,
  longitude: string,
  city: string,
  state: string,
  postcode: string,
  country: string,
  iso: string,
  iso_state: string,
  notes: string
}

export type AddressRequest = Partial<Address> & {
  address_line_2?: string,
  address_line_3?: string,
  company?: string,
  is_default?: Boolean,
  latitude?: string,
  longitude?: string
}

export type AddressUpdateRequest = {
  address_line_1?: string,
  address_line_2?: string,
  address_line_3?: string,
  company?: string,
  is_default?: Boolean,
  latitude?: string,
  longitude?: string,
  city?: string,
  state?: string,
  postcode?: string,
  country?: string,
  iso?: string,
  iso_state?: string,
  notes?: string
}

export type ProfileComms = {
  profile_id: string,
  email_optout: Boolean | null,
  push_optout: Boolean | null,
  sms_optout: Boolean | null,
  phone_optout: Boolean | null,
  post_optout: Boolean | null,
  email_bounced: Boolean | null,
  push_bounced: Boolean | null,
  sms_bounced: Boolean | null,
  phone_bounced: Boolean | null,
  post_bounced: Boolean | null,
  sms_promo: Boolean | null,
  push_promo: Boolean | null,
  email_promo: Boolean | null,
  phone_promo: Boolean | null,
  post_promo: Boolean | null,
  email_discover: Boolean | null,
  email_benefits: Boolean | null,
  email_reminders: Boolean | null,
  email_account: Boolean | null,
  email_bookings: Boolean | null,
  email_feedback: Boolean | null,
  email_location: Boolean | null,
  email_service: Boolean | null,
  sms_discover: Boolean | null,
  sms_benefits: Boolean | null,
  sms_reminders: Boolean | null,
  sms_account: Boolean | null,
  sms_bookings: Boolean | null,
  sms_feedback: Boolean | null,
  sms_location: Boolean | null,
  sms_service: Boolean | null,
  push_discover: Boolean | null,
  push_benefits: Boolean | null,
  push_reminders: Boolean | null,
  push_account: Boolean | null,
  push_bookings: Boolean | null,
  push_feedback: Boolean | null,
  push_location: Boolean | null,
  push_service: Boolean | null,
  phone_discover: Boolean | null,
  phone_benefits: Boolean | null,
  phone_reminders: Boolean | null,
  phone_account: Boolean | null,
  phone_bookings: Boolean | null,
  phone_feedback: Boolean | null,
  phone_location: Boolean | null,
  phone_service: Boolean | null,
  post_discover: Boolean | null,
  post_benefits: Boolean | null,
  post_reminders: Boolean | null,
  post_account: Boolean | null,
  post_bookings: Boolean | null,
  post_feedback: Boolean | null,
  post_location: Boolean | null,
  post_service: Boolean | null,
  email_verification: 'sent' | 'not_sent',
  sms_verification: 'sent' | 'not_sent',
  phone_verification: 'sent' | 'not_sent',
  post_verification: 'sent' | 'not_sent',
  terms_accepted_at: Boolean | null | null,
  terms_accepted_version: Boolean | null | null,
  created_at: Date,
  updated_at: Date
}

export type ProfileAppearance = {
  profile_id: string,
  hair_colour: string | null,
  hair_length: string | null,
  shape_body: string | null,
  shape_face: string | null,
  size_cup: string | null,
  size_hat: string | null,
  size_formal_jacket: string | null,
  size_formal_jacket_length: string | null,
  size_formal_shirt: string | null,
  size_formal_shirt_fit: string | null,
  size_formal_trouser: string | null,
  size_formal_trouser_drop: string | null,
  size_formal_trouser_leg: string | null,
  size_jacket: string | null,
  size_pant: string | null,
  size_shoe: string | null,
  size_type_age: string | null,
  size_type_region: string | null,
  size_top: string | null,
  size_gloves: string | null,
  size_swimwear_top: string | null,
  size_swimwear_bottom: string | null,
  size_swimwear_cup: string | null,
  size_dress: string | null,
  skin_type: string | null,
  measurement_arm: string | null,
  measurement_arm_inside: string | null,
  measurement_bust: string | null,
  measurement_chest: string | null,
  measurement_foot_length: string | null,
  measurement_head: string | null,
  measurement_height: string | null,
  measurement_hip: string | null,
  measurement_leg_inside: string | null,
  measurement_leg_outside: string | null,
  measurement_neck: string | null,
  measurement_neck_to_wrist: string | null,
  measurement_shoulders: string | null,
  measurement_waist: string | null,
  measurement_weight: string | null,
  brow_colour: string | null,
  eye_colour: string | null,
  measurement_hand_right_thumb: string | null,
  measurement_hand_right_index: string | null,
  measurement_hand_right_middle: string | null,
  measurement_hand_right_ring: string | null,
  measurement_hand_right_pinky: string | null,
  measurement_hand_left_thumb: string | null,
  measurement_hand_left_index: string | null,
  measurement_hand_left_middle: string | null,
  measurement_hand_left_ring: string | null,
  measurement_hand_left_pinky: string | null,
  measurement_ear_helix: string | null,
  measurement_ear_forward_helix: string | null,
  measurement_ear_flat: string | null,
  measurement_ear_conch: string | null,
  measurement_ear_tragus: string | null,
  measurement_ear_lobe: string | null,
  created_at: Date,
  updated_at: Date
}

export type ProfileDates = {}

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
  type: string
  name: string
  description: string
  phone: string
  email: string
  timezone: string
  external_id: string
  external_code: string
  is_published: boolean
  is_permanently_closed: boolean
  address: Address
  normal_hours: Array<NormalHour>
  special_hours: Array<SpecialHour>
}
export type Tier = {
  id: number
  profile_id: string
  name: string
  handle: string
  anniversary_at: Date
  maintained_at: Date
  assigned_at: Date | null
  achieved_at: Date
}
export type Region = {
  id: number
  name: string
  handle: string
  is_active: boolean
  country: string | null
  state: string | null
  created_at: Date
  updated_at: Date
}

export type CustomAttribute = {}

export type Profile = {
  id: string
  title: string
  first_name: string
  last_name: string
  email: string
  gender: 'male' | 'female' | 'witheld' | 'other'
  currency: 'string'
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
  reward_balance: number,
  point_balance: number,
  combined_balance_dollars: number
  point_balance_dollars: number
  profile_type: 'pending' | 'temporary' | 'active' | 'deleted'
  region: Region
  regions: Array<Region>
  updated_at: Date
  created_at: Date
}

export type RequestParams = {[key: string]: any}

export type RequestBody = {[key: string]: any}

export type OmneoRequest = {
  method: string,
  endpoint: string,
  params?: RequestParams,
  body?: RequestBody
}
