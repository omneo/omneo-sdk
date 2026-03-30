import { PaginationResponse } from './pagination'

export type Setting = {
  id: number
  handle: string
  value: string
  type: string
  created_at: string
  updated_at: string
}

export type SettingInput = Partial<Setting> & {
  handle: Setting['handle']
}

export type CreateSettingInput = {
  handle: Setting['handle']
  value: unknown
  type: 'string' | 'boolean' | 'integer' | 'float' | 'json'
}

export type UpdateSettingInput = {
  value?: unknown
  type?: 'string' | 'boolean' | 'integer' | 'float'
}

export type SettingResponse = PaginationResponse & {
  data: Setting[]
}
