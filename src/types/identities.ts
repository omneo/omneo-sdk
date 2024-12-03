import { Profile } from './profile'
import { PaginationResponse } from './pagination'

export type Identity = {
  id: number
  merged_from: string | null
  profile_id: string
  is_primary: boolean
  is_active: boolean
  identifier: string
  handle: string
  created_at: string
  updated_at: string
  profile?: Profile
}

export type IdentityRequest = {
  handle: string
  identifier: string
  is_active?: boolean
  is_primary?: boolean
}

export type IdentityResponse = PaginationResponse & {
  data: Array<Identity>
}
