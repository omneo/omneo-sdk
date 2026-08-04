import { PaginationResponse } from './pagination'
import { Region } from './region'
import { Currency } from './currencies'

export type PointDefinitionIssuePeriodType =
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'absolute_date'
  | 'absolute_week'
  | 'absolute_month'

export type PointDefinition = {
  id: number
  name: string
  handle: string
  region_id: number | null
  region: Region | null
  currency: Currency | null
  description: string | null
  notes: string | null
  is_reassignable: boolean
  issue_period: number | null
  issue_period_type: PointDefinitionIssuePeriodType | null
  issue_absolute_expiry: string | null
  tags: Array<string>
  created_at: string
  updated_at: string
}

export type CreatePointDefinitionInput = {
  name: string
  handle: string
  region_id?: number | null
  description?: string | null
  notes?: string | null
  is_reassignable?: boolean
  issue_period?: number | null
  issue_period_type?: PointDefinitionIssuePeriodType
  issue_absolute_expiry?: string | null
  tags?: Array<string>
  currency?: string | null
}

export type UpdatePointDefinitionInput = {
  name?: string
  region_id?: number | null
  description?: string | null
  notes?: string | null
  is_reassignable?: boolean
  issue_period?: number | null
  issue_period_type?: PointDefinitionIssuePeriodType
  issue_absolute_expiry?: string | null
  tags?: Array<string>
  currency?: string | null
}

export type Point = {
  id: number
  profile_id: string
  point_definition_id?: number
  linked_profile_id?: string | null
  value?: number
  value_initial?: number
  value_remaining?: number
  issued_at: string
  accrued_at?: string
  expires_at?: string
  status?: string | null
  source_id?: number | null
  source_type?: string | null
  source?: object | null
  definition?: PointDefinition
  created_at: string
  updated_at: string
  rate?: number | null
  description?: string | null
  meta?: object | null
}

export type PointDefinitionResponse = PaginationResponse & {
  data: PointDefinition[]
}

export type PointResponse = PaginationResponse & {
  data: Point[]
}

export type PointInput = {
  profile_id: string
  point_definition_id: number
  value_initial: number
  value_remaining?: number
  issued_at: string
  expires_at?: string
  description?: string
  meta?: object
}
