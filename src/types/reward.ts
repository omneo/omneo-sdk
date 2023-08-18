
export type RewardDefinition = {
  id: number
  name: string
  handle: string
  period: number
  description: string | null
  short_description: string | null
  long_description: string | null
  terms_conditions: string | null
  earn_instructions: string | null
  icon: string | null
  image_url: string | null
  issue_target_id: number
  expiry_target_id: number
  notify_issue_offset: number | null
  notify_expiry_offset: number | null
  internal_notes: string | null
  type: 'activation' | 'anniversary' | 'birthday' | 'bonus' | 'campaign' | 'customer-service' | 'reactivation' | 'spend' | 'staff' | 'system-adjustment' | 'tier' | 'achievement' | 'status' | 'points' | 'referral' | 'other'
  value: number
  is_extendable: boolean
  is_assignable: boolean
  is_reassignable: boolean
  is_published: boolean
  tags: Array<string>
  created_at: Date
  updated_at: Date
}

export type Reward = {
  id: number
  profile_id: string
  timezone: string
  value_initial: number
  value_remaining: number
  has_notified_issue: boolean
  has_notified_expiry: boolean
  expires_at: Date
  issued_at: Date
  is_expired: boolean
  is_active: boolean
  issued_local_at: Date
  expires_local_at: Date | null
  notify_issue_at: Date | null
  notify_expiry_at: Date | null
  extended_at: Date | null
  definition: RewardDefinition
  meta: {[key: string]: any} | null
  created_at: Date
  updated_at: Date
}
