// Route category: batches

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestBatchStore = {
  entity_type: string
  import_job_id?: number | null
}

export type BatchStoreItemsItem = {
  entity_id?: string | null
  error?: string | null
  external_id?: string | null
  status: 'pending' | 'success' | 'failed'
}

export type RequestQueryBatch = {
  offset?: number
  limit?: number
  filter?: {
    uuid?: string | FilterOperator
    import_job_id?: string | FilterOperator
    entity_type?: string | FilterOperator
    total_count?: string | FilterOperator
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

export type BatchItem = {
  created_at: string
  entity_id: string | null
  error: string | null
  external_id: string
  id: number
  status: 'pending' | 'success' | 'failed'
  updated_at: string
}

export type BatchStoreData = {
  batch_id: string
  entity_type: string
  import_job_id: number
}

export type RequestBatchStoreItems = {
  items: BatchStoreItemsItem[] | null
}

export type Batch = {
  created_at: string
  entity_type: string | null
  failed_count: number
  id: number
  import_job_id: number
  items: BatchItem[]
  processed_count: number
  status: 'pending' | 'success' | 'failed'
  success_count: number
  total_count: number | null
  updated_at: string
}

export type BatchStoreResponse = {
  data: BatchStoreData
}

export type BatchResponse = {
  data: Batch[]
  meta?: PaginationMeta
  links?: PaginationLink
}
