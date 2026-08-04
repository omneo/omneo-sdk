import { PaginationResponse, Profile } from '.'
export type DisplayOptionType = 'visible' | 'hidden' | 'mystery' | 'internal'

export type AchievementLevel = {
  id?: string
  name: string
  achievement_definition_id?: number
  display_number: number
  description?: string | null
  trigger?: number
  repeats?: boolean
  repeat_interval?: number
  allow_multiple_earn?: boolean
  computed_display_number?: number
  computed_trigger?: number
  meta?: {
      unlocks?: {
        id?: string,
        type?: string,
        id_type?: string
      } []
      [key: string]: any
  }
}

export type AchievementProgressLevel = {
  id: number
  achievement_definition_id: number
  name: string
  display_number: number
  description: string | null
  trigger: number
  repeats: boolean
  repeat_interval: number | null
  created_at: string
  updated_at: string
  meta: AchievementLevel['meta'] | null
  allow_multiple_earn: boolean | null
}

export type ProfileAchievementProgress = {
  id: number
  profile_id: string
  definition_id: number
  current_level_id: number | null
  next_level_id: number | null
  next_level_remain: number | null
  current_score: number
  created_at: string
  updated_at: string
  used_score: number | null
  prev_level_id: number | null
  current_credit: number
  prev_credit: number
  achieved_at: string | null
  anniversary_at: string | null
  current_level: AchievementProgressLevel | null
  next_level: AchievementProgressLevel | null
  prev_level: AchievementProgressLevel | null
}

export type AchievementDefinition = {
  id: number
  name: string
  handle: string
  description: string | null
  internal_notes: string | null
  type: string | null
  starts_at: string | null
  ends_at: string | null
  is_published: boolean
  display_level: boolean
  display_option: DisplayOptionType
  short_description: string | null
  long_description: string | null
  terms_conditions: string | null
  earn_instructions: string | null
  icon: string | null
  image_url: string | null
  levels: AchievementLevel[]
  tags: string[]
  meta?: {
    period?: string
    timezone?: string
    include_shop_count?: boolean
    [key:string]: any
  } | null
  timezone?: string | null
  period?: number | null
  created_at?: string
  updated_at?: string
  enable_annual_earn_cycle?: boolean
}

export type AchievementDefinitionResponse = PaginationResponse & {
  data: AchievementDefinition[]
}

export type AchievementDefinitionInput = Partial<Omit<AchievementDefinition, 'id' | 'created_at' | 'updated_at'>> & {
  name: AchievementDefinition['name']
  handle: AchievementDefinition['handle']
}

export type ProfileAchievement = Omit<AchievementDefinition, 'levels' | 'tags' | 'created_at' | 'updated_at' | 'meta' | 'timezone' | 'period' | 'enable_annual_earn_cycle'> & {
    deleted_at: string | null
    created_at: string
    updated_at: string
    meta: AchievementDefinition['meta']
    enable_annual_earn_cycle: boolean
    timezone: AchievementDefinition['timezone']
    period: AchievementDefinition['period']
    region_id: number | null
    currency: string | null
    levels: AchievementProgressLevel[]
    tags?: string[]
    progress: ProfileAchievementProgress | null
}

export type ProfileAchievementsResponse = {
  data: ProfileAchievement[] | { [key: string]: ProfileAchievement }
}

export type ProfileAchievementPoint = {
    id: number
    profile_id: string
    profile: Profile
    count: number
    source_id: string | null
    source_type: string | null
    meta: {
        user?: string
        manual?: boolean
        [key: string]: any
    } | null
    issued_at: string
    expires_at: string | null
    created_at: string
    updated_at: string
}

export type ProfileAchievementPointsResponse = PaginationResponse & {
    data: ProfileAchievementPoint[]
}

export type ProfileCreateAchievementResponse = {
    data: ProfileAchievementPoint
}

export type CreateProfileAchievementInput = {
  definition_id: number
  count: number
  meta?: {
    manual?: boolean
    user?: string
    [key: string]: any
  } | null
  expires_at?: string | null
  issued_at?: string | null
}
