// Route category: automations

import type { ActionArgumentRecord, AnyJsonRecord, FilterOperator } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type AutomationTypeEnum = 'date' | 'scheduled'

export type AutomationFrequencyEnum = 'monthly' | 'weekly' | 'fortnightly' | 'daily'

export type SampleAutomationQueryArgumentsItem = {
  name: string
  value: AnyJsonRecord | null
}

export type AutomationActionsItemArgumentsItem = {
  is_dynamic?: boolean
  name: string
  value: AnyJsonRecord | null
}

export type RequestTriggerAutomation = {
  force?: boolean | null
  now?: string | null
}

export type UpdateAutomationActionsItem = {
  arguments?: ActionArgumentRecord[] | null
  description?: string | null
  name: string
  notes?: string | null
  sort_order?: number | null
}

export type AutomationArgumentsItem = {
  name: string
  value: string
}

export type RequestQueryAction = {
  offset?: number
  limit?: number
  filter?: {
    uuid?: string | FilterOperator
    references_id?: string | FilterOperator
    name?: string | FilterOperator
    arguments?: string | FilterOperator
    sort_order?: string | FilterOperator
    description?: string | FilterOperator
    notes?: string | FilterOperator
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

export type RequestQueryAutomation = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    type?: string | FilterOperator
    query?: string | FilterOperator
    query_type?: string | FilterOperator
    slot?: string | FilterOperator
    date?: string | FilterOperator
    arguments?: string | FilterOperator
    description?: string | FilterOperator
    notes?: string | FilterOperator
    is_active?: string | FilterOperator
    frequency?: string | FilterOperator
    run_at?: string | FilterOperator
    taskable?: string | FilterOperator
    last_run_at?: string | FilterOperator
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

export type ActionArgument = {
  name: string
  value: string | number | boolean | { var: string }
  is_dynamic: boolean | null
}

export type AutomationArguments = {
  name: string
  value: any
}

export type AutomationQuerySampleResponse = {
  data: Record<string, any>[]
}

export type RequestSampleAutomationQuery = {
  arguments?: SampleAutomationQueryArgumentsItem[]
  now?: string
  query: string
}

export type CreateAutomationActionsItem = {
  arguments?: AutomationActionsItemArgumentsItem[] | null
  description?: string | null
  name: string
  notes?: string | null
  sort_order?: number | null
  uuid?: string | null
}

export type RequestUpdateAutomation = {
  actions?: UpdateAutomationActionsItem[] | null
  arguments?: AutomationArgumentsItem[] | null
  date?: string | null
  description?: string | null
  frequency?: AutomationFrequencyEnum | null
  is_active?: boolean | null
  last_run_at?: string | null
  name?: string
  notes?: string | null
  query?: string
  query_type?: string | null
  run_at?: number | null
  slot?: 'AU-MEL-0' | 'AU-MEL-1' | 'AU-MEL-2' | 'AU-MEL-3' | 'AU-MEL-4' | 'AU-MEL-5' | 'AU-MEL-6' | 'AU-MEL-7' | 'AU-MEL-8' | 'AU-MEL-9' | 'AU-MEL-10' | 'AU-MEL-11' | 'AU-MEL-12' | 'AU-MEL-13' | 'AU-MEL-14' | 'AU-MEL-15' | 'AU-MEL-16' | 'AU-MEL-17' | 'AU-MEL-18' | 'AU-MEL-19' | 'AU-MEL-20' | 'AU-MEL-21' | 'AU-MEL-22' | 'AU-MEL-23' | 'NZ-AUK-1' | 'AU-MEL-HOURLY-0' | null
  type?: AutomationTypeEnum
}

export type Action = {
  arguments: ActionArgument[]
  created_at: string
  description: string | null
  id: number
  name: string | null
  notes: string | null
  references_id: number
  sort_order: number | null
  updated_at: string
  uuid: string
}

export type RequestCreateAutomation = {
  actions?: CreateAutomationActionsItem[] | null
  arguments?: SampleAutomationQueryArgumentsItem[] | null
  date?: string | null
  description?: string | null
  frequency?: AutomationFrequencyEnum | null
  is_active?: boolean | null
  name: string
  notes?: string | null
  query: string
  query_type?: string | null
  run_at?: number | null
  slot?: 'AU-MEL-0' | 'AU-MEL-1' | 'AU-MEL-2' | 'AU-MEL-3' | 'AU-MEL-4' | 'AU-MEL-5' | 'AU-MEL-6' | 'AU-MEL-7' | 'AU-MEL-8' | 'AU-MEL-9' | 'AU-MEL-10' | 'AU-MEL-11' | 'AU-MEL-12' | 'AU-MEL-13' | 'AU-MEL-14' | 'AU-MEL-15' | 'AU-MEL-16' | 'AU-MEL-17' | 'AU-MEL-18' | 'AU-MEL-19' | 'AU-MEL-20' | 'AU-MEL-21' | 'AU-MEL-22' | 'AU-MEL-23' | 'NZ-AUK-1' | 'AU-MEL-HOURLY-0' | null
  type: AutomationTypeEnum
}

export type Automation = {
  actions: Action[]
  arguments: AutomationArguments[]
  created_at: string
  date: string | null
  description: string | null
  frequency: AutomationFrequencyEnum | null
  id: number
  is_active: boolean
  last_run_at: string
  name: string | null
  notes: string | null
  query: string | null
  query_type: string | null
  run_at: string | null
  slot: string | null
  type: AutomationTypeEnum
  updated_at: string
}

export type AutomationActionResponse = {
  data: Action[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type AutomationResponse = {
  data: Automation[]
  meta?: PaginationMeta
  links?: PaginationLink
}
