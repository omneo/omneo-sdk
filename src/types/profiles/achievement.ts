import type { AchievementDefinition, AchievementLevel } from '../achievements'
export type AchievementProgress = {
  id: number
  profile_id: string
  definition_id: number
  current_level_id: number | null
  prev_level_id: number | null
  next_level_id: number | null
  next_level_remain: number | null
  current_score: number | null
  current_credit: number | null
  prev_credit: number | null
  used_score: number | null
  achieved_at: string | null
  anniversary_at: string | null
  created_at: string
  updated_at: string
  current_level: AchievementLevel | null
  next_level: AchievementLevel | null
  prev_level: AchievementLevel | null
  current_remain?: number
  current_cycle_score?: number
}

export type ProfileAchievement = AchievementDefinition & {
  progress: AchievementProgress | []
}

export type AchievementDefinitionWithProgress = ProfileAchievement
