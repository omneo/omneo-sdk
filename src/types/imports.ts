// Route category: imports

import type { FilterOperator, AnyJsonRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type ImportJobStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'PROCESSING'

export type RequestFileUploadImport = {
  file: string
  importable_id: number | null
  importable_type: 'benefit_definition' | 'credit_definition' | 'reward_definition' | null
  mapping_fields: string
  meta?: string | null
  name?: string | null
}

export type RequestFinalizeImportJob = {
  total_batch_count: number
}

export type RequestCreateManualImport = {
  count?: number | null
}

export type RequestUploadImport = {
  file: string
  handler: 'omneo:profile' | 'omneo:product' | 'omneo:reward' | 'omneo:redemption' | 'omneo:transaction' | 'omneo:transaction-item' | 'omneo:location' | 'omneo:rate'
}

export type RequestQueryImport = {
  offset?: number
  limit?: number
  filter?: {
    count?: string | FilterOperator
    status?: string | FilterOperator
    issued_at?: string | FilterOperator
    condition?: string | FilterOperator
    name?: string | FilterOperator
    run_condition_on_issue_date?: string | FilterOperator
    exclude_if_related_exists?: string | FilterOperator
    use_condition?: string | FilterOperator
    mapping_fields?: string | FilterOperator
    meta?: string | FilterOperator
    importable_id?: string | FilterOperator
    importable_type?: string | FilterOperator
    created_at?: string | FilterOperator
    updated_at?: string | FilterOperator
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

export type RequestQueryImportJob = {
  offset?: number
  limit?: number
  filter?: {
    status?: string | FilterOperator
    handler?: string | FilterOperator
    result?: string | FilterOperator
    data?: string | FilterOperator
    total_batch_count?: string | FilterOperator
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

export type ImportJob = {
  created_at: string
  data: AnyJsonRecord | null
  handler: string
  id: number
  import_id: number
  result: AnyJsonRecord | null
  status: string
  total_batch_count: number | null
  updated_at: string
}

export type ImportJobExportResponse = {
  data: string
}

export type ImportJobBatchJsonResponse = {
  message: string
}

export type BatchImportJobJsonItem = {
  data: string[]
  handler: string
  result?: string[] | null
  status: ImportJobStatus
}

export type RequestExportImportJobRequest = {
  status: ImportJobStatus
}

export type Import = {
  condition: AnyJsonRecord | null
  count: number
  created_at: string
  exclude_if_related_exists: boolean
  failed_count: number
  id: number
  importable_id: string | null
  importable_type: | 'benefit_definition'
    | 'credit_definition'
    | 'reward_definition'
    | null
  issued_at: string | null
  mapping_fields: AnyJsonRecord | null
  meta: AnyJsonRecord | null
  name: string | null
  progress: number | null
  run_condition_on_issue_date: boolean
  status: ImportJobStatus | null
  updated_at: string
  use_condition: boolean
}

export type ImportJobResponse = {
  data: ImportJob[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type RequestBatchImportJobJson = {
  jobs: BatchImportJobJsonItem[] | null
}

export type ImportResponse = {
  data: Import[]
  meta?: PaginationMeta
  links?: PaginationLink
}
