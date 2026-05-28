// Route category: allocations

import type { AnyJsonRecord, AnyRecord, FilterOperator } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type BatchAllocationJsonDefinitionTypeEnum = 'benefit_definition' | 'point_definition' | 'reward_definition'

export type BatchAllocationJsonItem = {
  allocated_at?: string | null
  code: string
  external_id?: string | null
  meta?: AnyRecord | null
  name?: string | null
  valid_from?: string | null
  valid_to?: string | null
  value?: number | null
}

export type RequestQueryAllocation = {
  offset?: number
  limit?: number
  filter?: {
    external_id?: string | FilterOperator
    definition_id?: string | FilterOperator
    definition_type?: string | FilterOperator
    name?: string | FilterOperator
    allocated_id?: string | FilterOperator
    allocated_type?: string | FilterOperator
    allocated_at?: string | FilterOperator
    valid_from?: string | FilterOperator
    valid_to?: string | FilterOperator
    value?: string | FilterOperator
    code?: string | FilterOperator
    meta?: string | FilterOperator
    profile_id?: string | FilterOperator
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

export type Allocation = {
  allocated_at: string | null
  code: string
  created_at: string | null
  definition_id: number
  definition_type: string
  external_id: string
  id: number
  meta: AnyJsonRecord | null
  name: string | null
  updated_at: string | null
  valid_from: string | null
  valid_to: string | null
  value: number | null
}

export type AllocationCountGroupItem = {
  value: number | null
  count: number
}

export type AllocationBatchJsonResponse = {
  message: string
}

export type BatchAllocationJsonDefinition = {
  id: string
  type: BatchAllocationJsonDefinitionTypeEnum
}

export type AllocationResponse = {
  data: Allocation[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type AllocationCount = {
  all: number
  redeemed: number
  remaining: number
  group:
    | {
        redeemd: AllocationCountGroupItem[]
        remaining: AllocationCountGroupItem[]
      }
    | never[]
}

export type RequestBatchAllocationJson = {
  allocations: BatchAllocationJsonItem[] | null
  definition?: BatchAllocationJsonDefinition
}

export type AllocationCountResponse = {
  data: AllocationCount
}
