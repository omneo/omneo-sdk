import { PaginationResponse } from './pagination'

export type Import = {
  id: number
  status: string | null
  name: string | null
  count: number | null
  failed_count: number | null
  progress: number | null
  issued_at: string | null
  condition: { [key: string]: any } | null
  run_condition_on_issue_date: boolean | null
  exclude_if_related_exists: boolean | null
  use_condition: boolean | null
  mapping_fields: { [key: string]: any } | null
  meta: { [key: string]: any } | null
  importable_type: string | null
  importable_id: number | string | null
  created_at: string
  updated_at: string
}

export type ImportResponse = PaginationResponse & {
  data: Import
}

export type FileUploadImportInput = {
  file: unknown
  name?: string | null
  importable_type?: string | null
  importable_id?: number | null
  mapping_fields: string
  meta?: string | null
}

export type CreateUploadImportInput = {
  file: unknown
  handler: string
}

export type CreateManualImportInput = {
  count?: number | null
}
