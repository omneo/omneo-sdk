import { PaginationResponse } from '.'

export type DisplayOptionType = 'visible' | 'hidden' | 'mystery' | 'internal'

export type AchievementLevel = {
  id: string
  name: string
  achievement_definition_id?: number
  display_number: number
  description: string | null
  trigger: number
  repeats: boolean
  repeat_interval: number
  allow_multiple_earn: boolean
  computed_display_number: number
  computed_trigger: number
  meta?: {
      unlocks?: {
        type?: string,
        id_type?: string
      } []
      [key: string]: any
  }
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
