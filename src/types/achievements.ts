// Route category: achievements

import type { AnyRecord, FilterOperator, NamedHandle } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type AchievementDefinitionDisplayOptionEnum = 'visible' | 'hidden' | 'mystery' | 'internal'

export type AchievementDefinitionPeriodEnum = 'monthly' | 'weekly' | 'fortnightly' | 'daily' | 'yearly'

export type CreateAchievementDefinitionLevelsItem = {
  allow_multiple_earn?: boolean | null
  description?: string | null
  display_number: number
  meta?: AnyRecord | null
  name: string
  repeat_interval?: number | null
  repeats?: boolean
  trigger: number
}

export type UpdateAchievementDefinitionLevelsItem = {
  description?: string | null
  display_number: number
  meta?: AnyRecord | null
  name: string
  repeat_interval?: number | null
  repeats?: boolean
  trigger: number
}

export type RequestQueryAchievementDefinition = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    description?: string | FilterOperator
    internal_notes?: string | FilterOperator
    display_level?: string | FilterOperator
    display_option?: string | FilterOperator
    long_description?: string | FilterOperator
    short_description?: string | FilterOperator
    terms_conditions?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    earn_instructions?: string | FilterOperator
    type?: string | FilterOperator
    starts_at?: string | FilterOperator
    ends_at?: string | FilterOperator
    is_published?: string | FilterOperator
    meta?: string | FilterOperator
    enable_annual_earn_cycle?: string | FilterOperator
    timezone?: string | FilterOperator
    period?: string | FilterOperator
    region_id?: string | FilterOperator
    currency?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
  [key: string]: any
}

export type AchievementDefinitionMeta = {
  period?: string
  timezone?: string
  include_shop_count?: boolean
  [key: string]: any
}

export type AchievementLevelMeta = {
  unlocks?: {
    id?: string
    type?: string
    id_type?: string
  }[]
  [key: string]: any
}

export type RequestCreateAchievementDefinition = {
  currency?: string | null
  description?: string | null
  display_level?: boolean | null
  display_option?: AchievementDefinitionDisplayOptionEnum | null
  earn_instructions?: string | null
  enable_annual_earn_cycle?: boolean
  ends_at?: string | null
  handle: string
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_published?: boolean
  levels: CreateAchievementDefinitionLevelsItem[] | null
  long_description?: string | null
  meta?: AnyRecord | null
  name: string
  period?: AchievementDefinitionPeriodEnum | null
  region_id?: number | null
  short_description?: string | null
  starts_at?: string | null
  tags?: string[]
  terms_conditions?: string | null
  timezone?: string | null
  type?: string
}

export type RequestUpdateAchievementDefinition = {
  currency?: string | null
  description?: string | null
  display_level?: boolean | null
  display_option?: AchievementDefinitionDisplayOptionEnum | null
  earn_instructions?: string | null
  enable_annual_earn_cycle?: boolean
  ends_at?: string | null
  icon?: string | null
  image_url?: string | null
  internal_notes?: string | null
  is_published?: boolean
  levels?: UpdateAchievementDefinitionLevelsItem[] | null
  long_description?: string | null
  meta?: AnyRecord | null
  name?: string
  period?: AchievementDefinitionPeriodEnum | null
  region_id?: number | null
  short_description?: string | null
  starts_at?: string | null
  tags?: string[]
  terms_conditions?: string | null
  timezone?: string | null
  type?: string
}

export type AchievementLevel = {
  achievement_definition_id: number
  allow_multiple_earn: boolean
  computed_display_number: number
  computed_trigger: number
  description: string | null
  display_number: number
  id: number
  meta: AchievementLevelMeta | null
  name: string | null
  repeat_interval: number
  repeats: boolean
  trigger: number
}

export type AchievementDefinition = {
  created_at: string
  currency: string | null
  description: string | null
  display_level: boolean
  display_option: AchievementDefinitionDisplayOptionEnum | null
  earn_instructions: string | null
  enable_annual_earn_cycle: boolean
  ends_at: string | null
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  internal_notes: string | null
  is_published: boolean
  levels: AchievementLevel[]
  long_description: string | null
  meta: AchievementDefinitionMeta | null
  name: string | null
  period: AchievementDefinitionPeriodEnum | null
  region: NamedHandle | null
  region_id: number | null
  short_description: string | null
  starts_at: string | null
  tags: string[]
  terms_conditions: string | null
  timezone: string | null
  type: string | null
  updated_at: string
}

export type AchievementDefinitionResponse = {
  data: AchievementDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}
