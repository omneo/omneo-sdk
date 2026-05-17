import type { AnyJsonRecord, CommsChannel, FilterOperator } from '../common'
import type { PaginationLink, PaginationMeta } from '../pagination'
import type { ProfileAchievement } from './achievement'
import type { CreateProfileAttributes, ProfileCommsAttributes, ProfileCustomAttributesItem, CreateProfileDatesAttributesItem, ProfileAttributes, ProfileCustomAttribute, UpdateProfileAttributes, UpdateProfileDatesAttributesItem } from './attribute'
import type { TriggerCustomEventExcluded } from './custom'
import type { CreateProfileRegionsItem, ProfileRegion, UpdateProfileRegionsItem } from './region'
import type { Address } from '../address'
import type { Currency } from '../currencies'
import type { Identity } from '../identities'
import type { LocationProfileResource } from '../location-profiles'
import type { Location } from '../locations'
import type { ProfileOrganisation } from '../organisations'
import type { Status } from '../statuses'
import type { Tier } from '../tiers'

export type ProfileGenderEnum = 'male' | 'female' | 'withheld' | 'other'

export type ProfileNormalHoursDayOfWeekEnum = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export type RequestCheckAvailability = {
  email?: string | null
  mobile_phone?: string | null
}

export type RequestExistsProfileRequest = {
  id: string
  type: string
}

export type RequestMergeProfileRequest = {
  destination_profile_id: string
  source_profile_id: string
}

export type RequestSearchByIdProfileRequest = {
  id: string
  type: string
}

export type CreateProfileProfileTypeEnum = 'temporary' | 'system' | 'dependant' | 'incomplete' | 'pending' | 'active' | 'deleted'

export type CreateProfileAddressesItem = {
  address_line_1: string
  address_line_2?: string | null
  address_line_3?: string | null
  city: string
  company?: string | null
  country: string
  external_id?: string | null
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  meta?: AnyJsonRecord | null
  notes?: string | null
  postcode: string
  state: string
}

export type CreateProfileIdentitiesItem = {
  handle: string
  identifier: string
  is_active?: boolean | null
}

export type ProfileOrganisationsItem = {
  expires_at?: string | null
  id: number
  is_active?: boolean | null
  role_definition_id?: number | null
}

export type ProfileSpecialHoursItem = {
  available_from?: string | null
  available_until?: string | null
  end_at: string
  is_repeating?: boolean | null
  name: string
  start_at: string
}

export type RequestCreateProfileAchievement = {
  count: number
  definition_id: number
  expires_at?: string | null
  issued_at?: string | null
  meta?: AnyJsonRecord | null
}

export type RequestSyncProfileRequest = {
  since?: string
}

export type RequestTriggerCustomEvent = {
  context?: AnyJsonRecord | null
  event: Exclude<string, TriggerCustomEventExcluded>
}

export type UpdateConnectionStatusEnum = 'draft' | 'pending' | 'accepted' | 'rejected' | 'hold' | 'archived' | 'break'

export type UpdateConnectionExternalIdTypeEnum = 'attributes_date' | 'interaction' | 'external' | 'transaction' | 'order' | 'product_list' | 'addresses'

export type UpdateProfileProfileTypeEnum = 'temporary' | 'dependant' | 'incomplete' | 'system' | 'pending' | 'active' | 'deleted'

export type UpdateProfileAddressesItem = {
  address_line_1: string
  address_line_2?: string | null
  address_line_3?: string | null
  city: string
  company?: string | null
  country: string
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  meta?: AnyJsonRecord | null
  notes?: string | null
  postcode: string
  state?: string
}

export type UpdateProfileIdentitiesItem = {
  handle: string
  id: number
  identifier: string
  is_active?: boolean | null
}

export type RequestUpdateProfileAggregation = {
  at_risk_date?: string | null
  average_shop_days?: number | null
  channel?: CommsChannel | null
  dimension_frequency?: string | null
  dimension_join?: string | null
  dimension_recency?: string | null
  discount_avg?: number | null
  first_shop_days?: number | null
  latest_shop_currency_id?: number | null
  latest_shop_days?: number | null
  latest_shop_spend?: number | null
  latest_transacted_location_id?: number | null
  likely_country?: string | null
  likely_country_iso?: string | null
  likely_country_iso_score?: number | null
  likely_country_score?: number | null
  likely_region?: string | null
  likely_region_score?: number | null
  likely_state_iso?: string | null
  likely_state_iso_score?: number | null
  most_spend_12m_location_id?: number | null
  most_spend_location_id?: number | null
  previous_shop_date?: string | null
  purchased_brands?: AnyJsonRecord | null
  second_shop_date?: string | null
  second_shop_days?: number | null
  shop_count?: number | null
  shop_days?: number | null
  spend_12m?: number | null
  spend_12m_now?: number | null
  spend_all?: number | null
  spend_atv_12m?: number | null
  spend_atv_all?: number | null
  spend_first_date?: string | null
  spend_last_date?: string | null
  top_historic_status_id?: number | null
  total_shop_days?: number | null
  transacted_locations?: AnyJsonRecord | null
}

export type RequestUpdateProfilePublic = {
  is_public: boolean | null
}

export type ProfileTypeProfileTypeEnum = 'temporary' | 'dependant' | 'incomplete' | 'pending' | 'system' | 'active' | 'deleted'

export type RequestQueryProfile = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    title?: string | FilterOperator
    first_name?: string | FilterOperator
    last_name?: string | FilterOperator
    email?: string | FilterOperator
    gender?: string | FilterOperator
    currency?: string | FilterOperator
    joined_at?: string | FilterOperator
    mobile_phone?: string | FilterOperator
    secondary_phone?: string | FilterOperator
    birth_day?: string | FilterOperator
    birth_month?: string | FilterOperator
    birth_year?: string | FilterOperator
    company?: string | FilterOperator
    occupation?: string | FilterOperator
    avatar_url?: string | FilterOperator
    is_completed?: string | FilterOperator
    joined_location_id?: string | FilterOperator
    preferred_location_id?: string | FilterOperator
    updated_at?: string | FilterOperator
    created_at?: string | FilterOperator
    tags?: {
      handle?: string | FilterOperator
    }
    statuses?: {
      handle?: string | FilterOperator
    }
    profile_type?: string | FilterOperator
    identities?: {
      identifier?: string | FilterOperator
    }
    preferred_staff_id?: string | FilterOperator
    joined_staff_id?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
}

export type ProfilePreferredStaff = {
  id: number
  full_name: string
  email: string
  identities: Identity[]
}

export type ProfileJoinedStaff = {
  id: number
  full_name: string
  email: string
  identities: Identity[]
}

export type ProfileSpecialHours = {
  id: string
  name: string | null
  is_repeating: boolean
  is_closed: boolean
  available_from: string | null
  available_until: string | null
  start_at: string | null
  end_at: string | null
}

export type ProfileAggregation = {
  at_risk_date: string | null
  average_shop_days: number | null
  channel: CommsChannel | null
  dimension_frequency: 'F0' | 'F1' | 'F2' | 'FL' | 'FH' | null
  dimension_join: string
  dimension_recency: string | null
  discount_avg: number | null
  first_shop_days: number | null
  latest_shop_currency: Currency
  latest_shop_days: number | null
  latest_shop_spend: number | null
  latest_transacted_location: Location
  likely_country: string | null
  likely_country_iso: string | null
  likely_country_iso_score: number | null
  likely_country_score: number | null
  likely_region: string | null
  likely_region_score: number | null
  likely_state_iso: string | null
  likely_state_iso_score: number | null
  most_spend_12m_location: Location
  most_spend_location: Location
  most_transacted_location: Location
  previous_shop_date: string | null
  profile_id: string
  purchased_brands: string[] | null
  second_shop_date: string | null
  second_shop_days: number | null
  shop_count: number
  shop_days: number | null
  spend_12m: number | null
  spend_12m_now: number | null
  spend_all: number | null
  spend_atv_12m: number | null
  spend_atv_all: number | null
  spend_first_date: string | null
  spend_last_date: string | null
  store_join: Location
  top_historic_status: Status
  total_referred: number | null
  total_shop_days: number | null
  transacted_locations: string[] | null
}

export type ProfileStatus = {
  absolute_expiry: string | null
  code: string | null
  colour: string | null
  created_at: string
  description: string | null
  earn_instructions: string | null
  expires_at: string | null
  group_handle: string | null
  group_name: string | null
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  internal_notes: string | null
  is_active: boolean
  long_description: string | null
  name: string | null
  period: number | null
  period_type: string | null
  primary_colour: string | null
  secondary_colour: string | null
  short_description: string | null
  sort_order: number | null
  terms_conditions: string | null
  text_colour: string | null
  timezone: string | null
  updated_at: string
}

export type ProfileAvailabilityResponse = {
  data: {
    email: { available: boolean; profile: { id: string } | null } | null
    mobile_phone: {
      available: boolean
      profile: { id: string } | null
    } | null
  }
}

export type ProfileSyncResponse = {
  data: {
    message: string
  }
}

export type ProfileAchievementResponse = {
  data: ProfileAchievement[]
}

export type ProfileExistsResponse = {
  data: {
    id: string
  }
}

export type ProfileConnectionProfileInfoResponse = Record<string, any>

export type ProfileBatchResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type LocationProfileIndexByProfileResponse = {
  data: LocationProfileResource[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type ProfileNormalHoursItem = {
  available_from?: string | null
  available_until?: string | null
  day_of_week: ProfileNormalHoursDayOfWeekEnum
}

export type ProfileNormalHours = {
  id: string
  day_of_week: ProfileNormalHoursDayOfWeekEnum
  is_closed: boolean
  available_from: string | null
  available_until: string | null
}

export type BatchProfileJsonItem = {
  addresses?: CreateProfileAddressesItem[] | null
  attributes?: CreateProfileAttributes
  avatar_url?: string | null
  birth_day: number | null
  birth_month: number | null
  birth_year?: number | null
  comms_attributes?: ProfileCommsAttributes | null
  company?: string | null
  currency?: string | null
  custom_attributes?: ProfileCustomAttributesItem[] | null
  dates_attributes?: CreateProfileDatesAttributesItem[] | null
  email: string
  first_name: string
  gender?: ProfileGenderEnum | null
  identities?: CreateProfileIdentitiesItem[] | null
  joined_at?: string | null
  joined_location_external_code?: string
  joined_location_external_id?: string
  joined_location_id?: number | null
  last_name: string
  mobile_phone?: string | null
  occupation?: string | null
  organisations?: ProfileOrganisationsItem[] | null
  preferred_location_external_code?: string | null
  preferred_location_external_id?: string | null
  preferred_location_id?: number | null
  profile_type?: CreateProfileProfileTypeEnum | null
  region?: string
  region_country?: string | null
  region_id?: number
  region_state?: string | null
  regions?: CreateProfileRegionsItem[] | null
  secondary_phone?: string | null
  statuses?: string[]
  tags?: string[]
  title?: string | null
}

export type RequestUpdateProfileType = {
  profile_type: ProfileTypeProfileTypeEnum
}

export type RequestCreateProfile = {
  addresses?: CreateProfileAddressesItem[] | null
  attributes?: CreateProfileAttributes
  avatar_url?: string | null
  birth_day: number | null
  birth_month: number | null
  birth_year?: number | null
  comms_attributes?: ProfileCommsAttributes | null
  company?: string | null
  currency?: string | null
  custom_attributes?: ProfileCustomAttributesItem[] | null
  dates_attributes?: CreateProfileDatesAttributesItem[] | null
  email: string
  first_name: string
  gender?: ProfileGenderEnum | null
  identities?: CreateProfileIdentitiesItem[] | null
  joined_at?: string | null
  joined_location_external_code?: string
  joined_location_external_id?: string
  joined_location_id?: number | null
  joined_staff_id?: string | null
  last_name: string
  mobile_phone?: string | null
  normal_hours?: ProfileNormalHoursItem[] | null
  occupation?: string | null
  organisations?: ProfileOrganisationsItem[] | null
  preferred_location_external_code?: string | null
  preferred_location_external_id?: string | null
  preferred_location_id?: number | null
  preferred_staff_id?: string | null
  profile_type?: CreateProfileProfileTypeEnum | null
  region?: string
  region_country?: string | null
  region_id?: number
  region_state?: string | null
  regions?: CreateProfileRegionsItem[] | null
  secondary_phone?: string | null
  special_hours?: ProfileSpecialHoursItem[] | null
  statuses?: string[]
  tags?: string[]
  title?: string | null
}

export type RequestUpdateProfile = {
  addresses?: UpdateProfileAddressesItem[] | null
  attributes?: UpdateProfileAttributes
  avatar_url?: string | null
  birth_day?: number | null
  birth_month?: number | null
  birth_year?: string | null
  comms_attributes?: ProfileCommsAttributes | null
  company?: string | null
  currency?: string | null
  custom_attributes?: ProfileCustomAttributesItem[] | null
  dates_attributes?: UpdateProfileDatesAttributesItem[] | null
  email?: string
  first_name?: string
  gender?: ProfileGenderEnum | null
  identities?: UpdateProfileIdentitiesItem[] | null
  joined_location_external_code?: string
  joined_location_external_id?: string
  joined_location_id?: number
  joined_staff_id?: string | null
  last_name?: string | null
  mobile_phone?: string | null
  normal_hours?: ProfileNormalHoursItem[] | null
  occupation?: string | null
  organisations?: ProfileOrganisationsItem[] | null
  preferred_location_external_code?: string | null
  preferred_location_external_id?: string | null
  preferred_location_id?: number | null
  preferred_staff_id?: string | null
  profile_type?: UpdateProfileProfileTypeEnum | null
  region?: string
  region_country?: string | null
  region_id?: number
  region_state?: string | null
  regions?: UpdateProfileRegionsItem[] | null
  secondary_phone?: string | null
  special_hours?: ProfileSpecialHoursItem[] | null
  statuses?: string[]
  tags?: string[]
  title?: string | null
}

export type Profile = {
  address: Address
  addresses: Address[]
  attributes: ProfileAttributes
  avatar_url: string | null
  benefit_balance: number
  birth_date: string | null
  birth_day: number | null
  birth_days: number | null
  birth_days_past: number | null
  birth_month: number | null
  birth_year: number | null
  combined_balance_dollars: number
  company: string | null
  created_at: string
  created_by: string | null
  credit_balance: number
  currency: string | null
  custom_attributes: ProfileCustomAttribute[]
  email: string
  external_id: string
  first_name: string | null
  full_name: string | null
  gender: ProfileGenderEnum | null
  id: string
  identities: Identity[]
  is_public: boolean
  joined_at: string | null
  joined_location: Location
  joined_location_id: number
  joined_staff: ProfileJoinedStaff
  joined_staff_id: number
  last_name: string | null
  mobile_phone: string | null
  mobile_phone_country: number | null
  mobile_phone_e164: string | null
  mobile_phone_national: string | null
  mobile_phone_national_prefix: string | null
  next_birthday: string | null
  normal_hours: ProfileNormalHours[]
  occupation: string | null
  organisations: ProfileOrganisation[]
  point_balance: number
  point_balance_dollars: number
  preferred_location: Location | null
  preferred_location_id: number
  preferred_staff: ProfilePreferredStaff
  preferred_staff_id: number
  profile_type: | "temporary"
    | "dependant"
    | "incomplete"
    | "pending"
    | "system"
    | "active"
    | "deleted"
    | null
  region: ProfileRegion | null
  regions: ProfileRegion[]
  reward_balance: number
  secondary_phone: string | null
  special_hours: ProfileSpecialHours[]
  statuses: string[]
  statuses_original: ProfileStatus[]
  tags: string[]
  tier: Tier | null
  tier_handle: string | null
  title: string | null
  updated_at: string
}

export type RequestBatchProfileJson = {
  match_criteria: string
  profiles: BatchProfileJsonItem[] | null
}

export type ProfileResponse = {
  data: Profile[]
  meta?: PaginationMeta
  links?: PaginationLink
}
