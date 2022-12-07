export type OmneoConfig = {}

export type Identity = {
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
export type Profile = {
  identities: Array<Identity>
  attributes: {
    comms: ProfileComms
  }
}

export type RequestParams = {[key: string]: any}

export type RequestBody = {[key: string]: any}

export type OmneoRequest = {
  method: string,
  endpoint: string,
  params?: RequestParams,
  body?: RequestBody
}
