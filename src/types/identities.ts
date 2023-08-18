export type Identity = {
  id: string
  merged_from: string | null
  profile_id: string
  is_primary: boolean
  is_active: boolean
  identifier: string
  handle: string
  created_at: Date
  updated_at: Date
}

export type IdentityRequest = {
  handle: string
  identifier: string
  is_active?: boolean
  is_primary?: boolean
}
