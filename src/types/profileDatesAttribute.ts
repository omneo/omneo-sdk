export type ProfileDatesAttribute = {
  id?: string
  profile_id?: string
  date: string
  is_recurring: boolean
  recurring_schedule: string
  name: string
  handle: string
  relationship: string
  description: string
  meta?: any
  note: string
  created_at?: string
  updated_at?: string
}

export type ProfileDatesAttributesResponse = {
  data: Array<ProfileDatesAttribute>
}
