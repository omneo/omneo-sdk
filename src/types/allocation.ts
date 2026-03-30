import { PaginationResponse } from './pagination'

export type Allocation = {
  id: number
  external_id: string | null
  definition_id: number | null
  definition_type: string | null
  name: string | null
  allocated_at: string | null
  valid_from: string | null
  valid_to: string | null
  value: number | string | null
  code: string | null
  meta: { [key: string]: any } | null
  created_at: string | null
  updated_at: string | null
}

export type AllocationResponse = PaginationResponse &{
  data: Allocation
}

type AllocationGroupCount = {
  redeem: {
    value: number
    count:number
  },
  remaining: {
    value: number
    count:number
  }
}

export type AllocationCountResponse = {
  all: number
  redeemed: number
  remaining: number
  group: AllocationGroupCount | AllocationGroupCount[] | null
}
