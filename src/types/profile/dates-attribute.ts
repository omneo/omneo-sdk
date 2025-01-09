export type ProfileDatesAttribute = {
  id: number
  profile_id?: string
  type: string
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

export type ProfileDatesAttributeInput = Partial<Omit<ProfileDatesAttribute, 'id' | 'profile_id' | 'created_at' | 'updated_at'>> & {
  type: ProfileDatesAttribute['type']
  date: ProfileDatesAttribute['date']
}

export type ProfileDatesAttributesResponse = {
  data: ProfileDatesAttribute[]
}
