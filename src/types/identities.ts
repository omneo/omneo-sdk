import { Profile } from './profile'
import { PaginationLink, PaginationMeta } from './pagination'

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
}

export type IdentityRequest = {
  handle: string
  identifier: string
  is_active?: boolean
  is_primary?: boolean
}

export type IdentityWithProfile = Identity & {
    profile: Profile
}

export type IdentityResponse = Array<IdentityWithProfile> | {
    data: Array<IdentityWithProfile>
    links: PaginationLink
    meta: PaginationMeta
}
