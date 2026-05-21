// Route category: questions

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
export type QuestionOptionsItem = {
  image?: string | null
  label?: string | null
  value?: string | null
}

export type RequestQueryQuestion = {
  offset?: number
  limit?: number
  filter?: {
    handle?: string | FilterOperator
    current_version_id?: string | FilterOperator
    name?: string | FilterOperator
    description?: string | FilterOperator
    is_system?: string | FilterOperator
    is_active?: string | FilterOperator
    meta?: string | FilterOperator
    link_type?: string | FilterOperator
    link_target?: string | FilterOperator
    link_write_policy?: string | FilterOperator
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
}

export type QuestionVersion = {
  answer_ttl_days: number | null
  created_at: string
  default_value: AnyRecord | null
  description: string | null
  help_text: string | null
  icon: string | null
  id: number
  image_url: string | null
  label: string
  live_from: string | null
  live_to: string | null
  options: AnyRecord | null
  question_id: number
  type: string | null
  updated_at: string
  validation: AnyRecord | null
  version: number
}

export type RequestCreateQuestion = {
  answer_ttl_days?: number | null
  default_value?: string | null
  description?: string | null
  handle: string
  help_text?: string | null
  icon?: string | null
  image_url?: string | null
  is_active?: boolean
  is_system?: boolean
  label: string
  link_target?: string | null
  link_type?: 'none' | 'profile' | 'transaction' | 'rating' | 'interaction' | 'appointment' | 'connection' | 'transaction_item'
  link_write_policy?: string | null
  live_from?: string | null
  live_to?: string | null
  meta?: AnyJsonRecord | null
  name?: string | null
  options?: QuestionOptionsItem[] | null
  type: 'text' | 'textarea' | 'number' | 'slider' | 'boolean' | 'single_select' | 'multi_select' | 'date' | 'datetime' | 'email' | 'phone' | 'json'
  validation?: string[] | null
}

export type RequestUpdateQuestion = {
  answer_ttl_days?: number | null
  default_value?: string | null
  description?: string | null
  handle?: string
  help_text?: string | null
  icon?: string | null
  image_url?: string | null
  is_active?: boolean
  label?: string
  link_target?: string | null
  link_type?: 'none' | 'profile' | 'transaction' | 'rating' | 'interaction' | 'appointment' | 'connection' | 'transaction_item'
  link_write_policy?: string | null
  live_from?: string | null
  live_to?: string | null
  meta?: AnyJsonRecord | null
  name?: string | null
  options?: QuestionOptionsItem[] | null
  type?: 'text' | 'textarea' | 'number' | 'slider' | 'boolean' | 'single_select' | 'multi_select' | 'date' | 'datetime' | 'email' | 'phone' | 'json'
  validation?: string[] | null
}

export type Question = {
  created_at: string
  current_version: QuestionVersion | undefined
  description: string | null
  handle: string | null
  id: number
  is_active: boolean
  is_live: boolean
  is_system: boolean
  link_target: string | null
  link_type: string
  link_write_policy: string | null
  meta: AnyRecord | null
  name: string | null
  updated_at: string
  versions: QuestionVersion[]
}

export type QuestionResponse = {
  data: Question[]
  meta?: PaginationMeta
  links?: PaginationLink
}
