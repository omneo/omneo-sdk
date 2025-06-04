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
  created_at: string
  updated_at: string
}

export type CommsChannel = 'email' | 'sms' | 'post' | 'push' | 'phone'
export type ProfileCommsInput = Partial<Omit<ProfileComms, 'profile_id' | 'created_at' | 'updated_at'>>
