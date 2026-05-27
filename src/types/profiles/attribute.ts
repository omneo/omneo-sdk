import type { AnyJsonRecord, AnyRecord, FilterOperator } from '../common'
import type { Profile } from './profile'
import type { CustomFieldTypeEnum } from '../custom-fields'
import type { PaginationLink, PaginationMeta } from '../pagination'

export type ProfileAttributesComms = {
  email_consent_updated_at?: string | null
  sms_consent_updated_at?: string | null
}

export type ProfileCommsAttributes = {
  email_benefits?: boolean | null
  email_bounced?: boolean | null
  email_consent_updated_at?: string | null
  email_promo?: boolean | null
  sms_consent_updated_at?: string | null
  sms_promo?: boolean | null
}

export type ProfileCustomAttributesItem = {
  handle: string
  namespace: string
  type: CustomFieldTypeEnum
  value?: AnyJsonRecord | null
}

export type RequestUpdateCustomAttribute = {
  type: CustomFieldTypeEnum
  value?: AnyRecord | null
}

export type RequestUpdateProfileAppearanceAttribute = {
  brow_colour?: string | null
  eye_colour?: string | null
  hair_colour?: string | null
  hair_length?: string | null
  measurement_arm?: string | null
  measurement_arm_inside?: string | null
  measurement_bust?: string | null
  measurement_chest?: string | null
  measurement_ear_conch?: string | null
  measurement_ear_flat?: string | null
  measurement_ear_forward_helix?: string | null
  measurement_ear_helix?: string | null
  measurement_ear_lobe?: string | null
  measurement_ear_tragus?: string | null
  measurement_foot_length?: string | null
  measurement_hand_left_index?: string | null
  measurement_hand_left_middle?: string | null
  measurement_hand_left_pinky?: string | null
  measurement_hand_left_ring?: string | null
  measurement_hand_left_thumb?: string | null
  measurement_hand_right_index?: string | null
  measurement_hand_right_middle?: string | null
  measurement_hand_right_pinky?: string | null
  measurement_hand_right_ring?: string | null
  measurement_hand_right_thumb?: string | null
  measurement_head?: string | null
  measurement_height?: string | null
  measurement_hip?: string | null
  measurement_leg_inside?: string | null
  measurement_leg_outside?: string | null
  measurement_neck?: string | null
  measurement_neck_to_wrist?: string | null
  measurement_shoulders?: string | null
  measurement_waist?: string | null
  measurement_weight?: string | null
  shape_body?: string | null
  shape_face?: string | null
  size_cup?: string | null
  size_dress?: string | null
  size_formal_jacket?: string | null
  size_formal_jacket_length?: string | null
  size_formal_shirt?: string | null
  size_formal_shirt_fit?: string | null
  size_formal_trouser?: string | null
  size_formal_trouser_drop?: string | null
  size_formal_trouser_leg?: string | null
  size_gloves?: string | null
  size_hat?: string | null
  size_jacket?: string | null
  size_pant?: string | null
  size_shoe?: string | null
  size_swimwear_bottom?: string | null
  size_swimwear_cup?: string | null
  size_swimwear_top?: string | null
  size_top?: string | null
  size_type_age?: string | null
  size_type_region?: string | null
  skin_type?: string | null
}

export type ProfileCommsAttributeSmsVerificationEnum = 'not_sent' | 'sent' | 'delivered' | 'undelivered' | 'failed' | 'verified'

export type ProfileDatesAttributeLinksItem = {
  profile_id: string
  relationship?: string | null
  role?: string | null
}

export type RequestQueryCustomAttribute = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
    namespace?: string | FilterOperator
    name?: string | FilterOperator
    type?: string | FilterOperator
    value?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  [key: string]: any
}

export type ProfileAppearanceAttribute = {
  brow_colour: string | null
  created_at: string
  eye_colour: string | null
  hair_colour: string | null
  hair_length: string | null
  measurement_arm: string | null
  measurement_arm_inside: string | null
  measurement_bust: string | null
  measurement_chest: string | null
  measurement_ear_conch: string | null
  measurement_ear_flat: string | null
  measurement_ear_forward_helix: string | null
  measurement_ear_helix: string | null
  measurement_ear_lobe: string | null
  measurement_ear_tragus: string | null
  measurement_foot_length: string | null
  measurement_hand_left_index: string | null
  measurement_hand_left_middle: string | null
  measurement_hand_left_pinky: string | null
  measurement_hand_left_ring: string | null
  measurement_hand_left_thumb: string | null
  measurement_hand_right_index: string | null
  measurement_hand_right_middle: string | null
  measurement_hand_right_pinky: string | null
  measurement_hand_right_ring: string | null
  measurement_hand_right_thumb: string | null
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
  profile_id: string
  shape_body: string | null
  shape_face: string | null
  size_cup: string | null
  size_dress: string | null
  size_formal_jacket: string | null
  size_formal_jacket_length: string | null
  size_formal_shirt: string | null
  size_formal_shirt_fit: string | null
  size_formal_trouser: string | null
  size_formal_trouser_drop: string | null
  size_formal_trouser_leg: string | null
  size_gloves: string | null
  size_hat: string | null
  size_jacket: string | null
  size_pant: string | null
  size_shoe: string | null
  size_swimwear_bottom: string | null
  size_swimwear_cup: string | null
  size_swimwear_top: string | null
  size_top: string | null
  size_type_age: string | null
  size_type_region: string | null
  skin_type: string | null
  updated_at: string
}

export type ProfileCustomAttribute = {
  created_at: string
  handle: string | null
  id: number
  namespace: string
  profile?: Profile
  profile_id: string
  type: string | null
  updated_at: string
  value: string | null
}

export type ProfileDatesAttributeLink = {
  attributes_date_id: number
  created_at: string | null
  id: number
  profile_id: string
  relationship: string
  role: string
  updated_at: string | null
}

export type CreateProfileAttributes = {
  appearance?: AnyJsonRecord | null
  comms?: ProfileAttributesComms | null
}

export type UpdateProfileAttributes = {
  appearance?: AnyJsonRecord | null
  comms?: ProfileAttributesComms | null
  dates?: string[] | null
}

export type RequestUpdateProfileCommsAttribute = {
  email_account?: boolean
  email_benefits?: boolean
  email_bookings?: boolean
  email_bounced?: boolean
  email_consent_updated_at?: string | null
  email_discover?: boolean
  email_feedback?: boolean
  email_location?: boolean
  email_optout?: boolean | null
  email_promo?: boolean
  email_reminders?: boolean
  email_service?: boolean
  email_verification?: ProfileCommsAttributeSmsVerificationEnum
  phone_account?: boolean
  phone_benefits?: boolean
  phone_bookings?: boolean
  phone_bounced?: boolean
  phone_discover?: boolean
  phone_feedback?: boolean
  phone_location?: boolean
  phone_optout?: boolean | null
  phone_promo?: boolean
  phone_reminders?: boolean
  phone_service?: boolean
  phone_verification?: ProfileCommsAttributeSmsVerificationEnum
  post_account?: boolean
  post_benefits?: boolean
  post_bookings?: boolean
  post_bounced?: boolean
  post_discover?: boolean
  post_feedback?: boolean
  post_location?: boolean
  post_optout?: boolean | null
  post_promo?: boolean
  post_reminders?: boolean
  post_service?: boolean
  post_verification?: ProfileCommsAttributeSmsVerificationEnum
  push_account?: boolean
  push_benefits?: boolean
  push_bookings?: boolean
  push_bounced?: boolean
  push_discover?: boolean
  push_feedback?: boolean
  push_location?: boolean
  push_optout?: boolean | null
  push_promo?: boolean
  push_reminders?: boolean
  push_service?: boolean
  sms_account?: boolean
  sms_benefits?: boolean
  sms_bookings?: boolean
  sms_bounced?: boolean
  sms_consent_updated_at?: string | null
  sms_discover?: boolean
  sms_feedback?: boolean
  sms_location?: boolean
  sms_optout?: boolean | null
  sms_promo?: boolean
  sms_reminders?: boolean
  sms_service?: boolean
  sms_verification?: ProfileCommsAttributeSmsVerificationEnum
  terms_accepted_at?: string | null
  terms_accepted_version?: string | null
}

export type ProfileCommsAttribute = {
  created_at: string
  email_account: boolean
  email_account_raw: number | null
  email_benefits: boolean
  email_benefits_raw: number | null
  email_bookings: boolean
  email_bookings_raw: number | null
  email_bounced: boolean
  email_bounced_raw: number | null
  email_consent_updated_at: string | null
  email_discover: boolean
  email_discover_raw: number | null
  email_feedback: boolean
  email_feedback_raw: number | null
  email_location: boolean
  email_location_raw: number | null
  email_optout: boolean
  email_optout_raw: number | null
  email_promo: boolean
  email_promo_raw: number | null
  email_reminders: boolean
  email_reminders_raw: number | null
  email_service: boolean
  email_service_raw: number | null
  email_verification: ProfileCommsAttributeSmsVerificationEnum
  phone_account: boolean
  phone_account_raw: number | null
  phone_benefits: boolean
  phone_benefits_raw: number | null
  phone_bookings: boolean
  phone_bookings_raw: number | null
  phone_bounced: boolean
  phone_bounced_raw: number | null
  phone_discover: boolean
  phone_discover_raw: number | null
  phone_feedback: boolean
  phone_feedback_raw: number | null
  phone_location: boolean
  phone_location_raw: number | null
  phone_optout: boolean
  phone_optout_raw: number | null
  phone_promo: boolean
  phone_promo_raw: number | null
  phone_reminders: boolean
  phone_reminders_raw: number | null
  phone_service: boolean
  phone_service_raw: number | null
  phone_verification: ProfileCommsAttributeSmsVerificationEnum
  post_account: boolean
  post_account_raw: number | null
  post_benefits: boolean
  post_benefits_raw: number | null
  post_bookings: boolean
  post_bookings_raw: number | null
  post_bounced: boolean
  post_bounced_raw: number | null
  post_discover: boolean
  post_discover_raw: number | null
  post_feedback: boolean
  post_feedback_raw: number | null
  post_location: boolean
  post_location_raw: number | null
  post_optout: boolean
  post_optout_raw: number | null
  post_promo: boolean
  post_promo_raw: number | null
  post_reminders: boolean
  post_reminders_raw: number | null
  post_service: boolean
  post_service_raw: number | null
  post_verification: ProfileCommsAttributeSmsVerificationEnum
  profile_id: string
  push_account: boolean
  push_account_raw: number | null
  push_benefits: boolean
  push_benefits_raw: number | null
  push_bookings: boolean
  push_bookings_raw: number | null
  push_bounced: boolean
  push_bounced_raw: number | null
  push_discover: boolean
  push_discover_raw: number | null
  push_feedback: boolean
  push_feedback_raw: number | null
  push_location: boolean
  push_location_raw: number | null
  push_optout: boolean
  push_optout_raw: number | null
  push_promo: boolean
  push_promo_raw: number | null
  push_reminders: boolean
  push_reminders_raw: number | null
  push_service: boolean
  push_service_raw: number | null
  sms_account: boolean
  sms_account_raw: number | null
  sms_benefits: boolean
  sms_benefits_raw: number | null
  sms_bookings: boolean
  sms_bookings_raw: number | null
  sms_bounced: boolean
  sms_bounced_raw: number | null
  sms_consent_updated_at: string | null
  sms_discover: boolean
  sms_discover_raw: number | null
  sms_feedback: boolean
  sms_feedback_raw: number | null
  sms_location: boolean
  sms_location_raw: number | null
  sms_optout: boolean
  sms_optout_raw: number | null
  sms_promo: boolean
  sms_promo_raw: number | null
  sms_reminders: boolean
  sms_reminders_raw: number | null
  sms_service: boolean
  sms_service_raw: number | null
  sms_verification: ProfileCommsAttributeSmsVerificationEnum
  terms_accepted_at: string | null
  terms_accepted_version: string | null
  updated_at: string
}

export type CreateProfileDatesAttributesItem = {
  date: string
  description?: string | null
  handle: string
  is_recurring?: boolean | null
  links?: ProfileDatesAttributeLinksItem[] | null
  meta?: AnyJsonRecord | null
  name: string
  note?: string | null
  recurring_schedule?: string | null
  relationship?: string | null
  role?: string | null
}

export type UpdateProfileDatesAttributesItem = {
  date: string
  description?: string | null
  handle?: string
  is_recurring?: boolean | null
  links?: ProfileDatesAttributeLinksItem[] | null
  meta?: AnyJsonRecord | null
  name?: string
  note?: string | null
  recurring_schedule?: string | null
  relationship?: string | null
  role?: string | null
}

export type RequestUpdateProfileDatesAttribute = {
  date: string
  description?: string | null
  handle: string
  is_recurring?: boolean | null
  links?: ProfileDatesAttributeLinksItem[] | null
  meta?: AnyJsonRecord | null
  name?: string
  note?: string | null
  recurring_schedule?: string | null
  relationship: string
  role?: string | null
}

export type ProfileCustomAttributeResponse = {
  data: ProfileCustomAttribute[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type ProfileDatesAttribute = {
  created_at: string
  date: string | null
  description: string | null
  handle: string | null
  id: number
  is_recurring: boolean
  links: ProfileDatesAttributeLink[]
  meta: AnyJsonRecord | null
  name: string | null
  note: string | null
  profile_id: string
  recurring_schedule: string | null
  relationship: string | null
  role: string
  updated_at: string
}

export type ProfileDatesAttributeResponse = {
  data: ProfileDatesAttribute[]
}

export type ProfileAttributes = {
  comms: ProfileCommsAttribute
  appearance: ProfileAppearanceAttribute
  dates: ProfileDatesAttribute[]
}

export type ProfileWithoutIdentityAttributes = {
  comms: ProfileCommsAttribute
  appearance: ProfileAppearanceAttribute
  dates: ProfileDatesAttribute[]
}
