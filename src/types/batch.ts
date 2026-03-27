import { PaginationResponse } from './pagination'

export type BatchItem = {
  id: number
  entity_id: number | string | null
  external_id: string | null
  status: string | null
  error: string | null
  created_at: string
  updated_at: string
}

export type Batch = {
  id: string
  import_job_id: number | null
  entity_type: string | null
  total_count: number | null
  status: string | null
  success_count: number | null
  failed_count: number | null
  processed_count: number | null
  items: BatchItem[]
  created_at: string
  updated_at: string
}

export type BatchResponse = PaginationResponse & {
  data: Batch[]
}
