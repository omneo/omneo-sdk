import type { Profile } from './profile'
import type { PaginationLink, PaginationMeta } from '../pagination'

export type AchievementPointMeta = {
  user?: string
  manual?: boolean
  [key: string]: any
}

export type AchievementPoint = {
  count: number
  created_at: string
  expires_at: string | null
  id: number
  issued_at: string | null
  meta: AchievementPointMeta | null
  profile: Profile
  profile_id: string
  source_id: string | null
  source_type: string | null
  updated_at: string
}

export type ProfileAchievementPointResponse = {
  data: AchievementPoint[]
  meta?: PaginationMeta
  links?: PaginationLink
}
