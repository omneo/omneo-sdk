export type ProfileComms = {
  profile_id: string
  email_optout: Boolean | null
  readonly email_optout_raw: number
  push_optout: Boolean | null
  readonly push_optout_raw: number
  sms_optout: Boolean | null
  readonly sms_optout_raw: number
  phone_optout: Boolean | null
  readonly phone_optout_raw: number
  post_optout: Boolean | null
  readonly post_optout_raw: number
  email_bounced: Boolean | null
  readonly email_bounced_raw: number
  push_bounced: Boolean | null
  readonly push_bounced_raw: number
  sms_bounced: Boolean | null
  readonly sms_bounced_raw: number
  phone_bounced: Boolean | null
  readonly phone_bounced_raw: number
  post_bounced: Boolean | null
  readonly post_bounced_raw: number
  sms_promo: Boolean | null
  readonly sms_promo_raw: number
  push_promo: Boolean | null
  readonly push_promo_raw: number
  email_promo: Boolean | null
  readonly email_promo_raw: number
  phone_promo: Boolean | null
  readonly phone_promo_raw: number
  post_promo: Boolean | null
  readonly post_promo_raw: number
  email_discover: Boolean | null
  readonly email_discover_raw: number
  email_benefits: Boolean | null
  readonly email_benefits_raw: number
  email_reminders: Boolean | null
  readonly email_reminders_raw: number
  email_account: Boolean | null
  readonly email_account_raw: number
  email_bookings: Boolean | null
  readonly email_bookings_raw: number
  email_feedback: Boolean | null
  readonly email_feedback_raw: number
  email_location: Boolean | null
  readonly email_location_raw: number
  email_service: Boolean | null
  readonly email_service_raw: number
  sms_discover: Boolean | null
  readonly sms_discover_raw: number
  sms_benefits: Boolean | null
  readonly sms_benefits_raw: number
  sms_reminders: Boolean | null
  readonly sms_reminders_raw: number
  sms_account: Boolean | null
  readonly sms_account_raw: number
  sms_bookings: Boolean | null
  readonly sms_bookings_raw: number
  sms_feedback: Boolean | null
  readonly sms_feedback_raw: number
  sms_location: Boolean | null
  readonly sms_location_raw: number
  sms_service: Boolean | null
  readonly sms_service_raw: number
  push_discover: Boolean | null
  readonly push_discover_raw: number
  push_benefits: Boolean | null
  readonly push_benefits_raw: number
  push_reminders: Boolean | null
  readonly push_reminders_raw: number
  push_account: Boolean | null
  readonly push_account_raw: number
  push_bookings: Boolean | null
  readonly push_bookings_raw: number
  push_feedback: Boolean | null
  readonly push_feedback_raw: number
  push_location: Boolean | null
  readonly push_location_raw: number
  push_service: Boolean | null
  readonly push_service_raw: number
  phone_discover: Boolean | null
  readonly phone_discover_raw: number
  phone_benefits: Boolean | null
  readonly phone_benefits_raw: number
  phone_reminders: Boolean | null
  readonly phone_reminders_raw: number
  phone_account: Boolean | null
  readonly phone_account_raw: number
  phone_bookings: Boolean | null
  readonly phone_bookings_raw: number
  phone_feedback: Boolean | null
  readonly phone_feedback_raw: number
  phone_location: Boolean | null
  readonly phone_location_raw: number
  phone_service: Boolean | null
  readonly phone_service_raw: number
  post_discover: Boolean | null
  readonly post_discover_raw: number
  post_benefits: Boolean | null
  readonly post_benefits_raw: number
  post_reminders: Boolean | null
  readonly post_reminders_raw: number
  post_account: Boolean | null
  readonly post_account_raw: number
  post_bookings: Boolean | null
  readonly post_bookings_raw: number
  post_feedback: Boolean | null
  readonly post_feedback_raw: number
  post_location: Boolean | null
  readonly post_location_raw: number
  post_service: Boolean | null
  readonly post_service_raw: number
  email_verification: 'sent' | 'not_sent'
  sms_verification: 'sent' | 'not_sent'
  phone_verification: 'sent' | 'not_sent'
  post_verification: 'sent' | 'not_sent'
  email_consent_updated_at: string | null
  sms_consent_updated_at: string | null
  terms_accepted_at: Boolean | null | null
  terms_accepted_version: Boolean | null | null
  created_at: string
  updated_at: string
}

export type CommsChannel = 'email' | 'sms' | 'post' | 'push' | 'phone'
export type ProfileCommsInput = Partial<Omit<ProfileComms, 'profile_id' | 'created_at' | 'updated_at'>>
