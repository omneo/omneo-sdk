// Route category: settings

import type { AnyRecord, FilterOperator } from './common'
export type CreateSettingTypeEnum = 'string' | 'boolean' | 'integer' | 'float' | 'json'

export type UpdateSettingTypeEnum = 'string' | 'boolean' | 'integer' | 'float'

export type RequestQuerySetting = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
    value?: string | FilterOperator
    type?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
}

export type Setting = {
  created_at: string
  handle: string | null
  id: number
  type: string | null
  updated_at: string
  value: string | null
}

export type SettingEnvironmentItem = {
  handle: string
  value: any
}

export type RequestCreateSetting = {
  handle: string
  type: CreateSettingTypeEnum
  value: AnyRecord | null
}

export type RequestUpdateSetting = {
  type?: UpdateSettingTypeEnum
  value?: AnyRecord | null
}

export type SettingResponse = {
  data: Setting[]
}

export type SettingEnvironmentResponse = {
  data: SettingEnvironmentItem[]
}
