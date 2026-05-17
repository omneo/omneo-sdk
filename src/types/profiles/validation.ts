import type { FilterOperator } from '../common'
import type { PaginationLink, PaginationMeta } from '../pagination'

export type ProfileValidationRuleTypeEnum = 'email' | 'mobile' | 'name'

export type ProfileValidationRuleRuleTypeEnum = 'exact' | 'domain' | 'prefix' | 'regex'

export type ProfileValidationRuleAppliesToEnum = 'create' | 'update' | 'import' | 'all'

export type ProfileValidationRuleValuesItem = {
  is_active?: boolean | null
  value: string
}

export type RequestCreateProfileValidationRuleValue = {
  is_active?: boolean | null
  value: string
}

export type RequestUpdateProfileValidationRuleValue = {
  is_active?: boolean | null
  value?: string
}

export type RequestQueryProfileValidationRule = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    name?: string | FilterOperator
    type?: string | FilterOperator
    rule_type?: string | FilterOperator
    applies_to?: string | FilterOperator
    pattern?: string | FilterOperator
    priority?: string | FilterOperator
    is_active?: string | FilterOperator
    effective_from?: string | FilterOperator
    effective_to?: string | FilterOperator
    created_by?: string | FilterOperator
    updated_by?: string | FilterOperator
    values?: {
      value?: string | FilterOperator
    }
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

export type ProfileValidationRuleValue = {
  created_at: string
  id: number
  is_active: boolean
  rule_id: number
  updated_at: string
  value: string
}

export type RequestCreateProfileValidationRule = {
  applies_to: ProfileValidationRuleAppliesToEnum
  created_by?: string | null
  effective_from?: string | null
  effective_to?: string | null
  error_message?: string | null
  is_active?: boolean | null
  name: string
  pattern?: string | null
  priority?: number | null
  rule_type: ProfileValidationRuleRuleTypeEnum
  type: ProfileValidationRuleTypeEnum
  updated_by?: string | null
  values?: ProfileValidationRuleValuesItem[] | null
}

export type RequestUpdateProfileValidationRule = {
  applies_to?: ProfileValidationRuleAppliesToEnum
  created_by?: string | null
  effective_from?: string | null
  effective_to?: string | null
  error_message?: string | null
  is_active?: boolean | null
  name?: string
  pattern?: string | null
  priority?: number | null
  rule_type?: ProfileValidationRuleRuleTypeEnum
  type?: ProfileValidationRuleTypeEnum
  updated_by?: string | null
  values?: ProfileValidationRuleValuesItem[] | null
}

export type ProfileValidationRuleValueResponse = {
  data: ProfileValidationRuleValue[]
}

export type ProfileValidationRule = {
  applies_to: ProfileValidationRuleAppliesToEnum
  created_at: string
  created_by: string | null
  effective_from: string | null
  effective_to: string | null
  error_message: string | null
  id: number
  is_active: boolean
  name: string | null
  pattern: string | null
  priority: number | null
  rule_type: ProfileValidationRuleRuleTypeEnum
  type: ProfileValidationRuleTypeEnum
  updated_at: string
  updated_by: string | null
  values: ProfileValidationRuleValue[]
}

export type ProfileValidationRuleResponse = {
  data: ProfileValidationRule[]
  meta?: PaginationMeta
  links?: PaginationLink
}
