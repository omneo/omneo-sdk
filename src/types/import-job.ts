import { PaginationResponse } from './pagination'

export type ImportJob = {
  id: number
  import_id: number
  status: string | null
  handler: string | null
  result: { [key: string]: any } | null
  data: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type ImportJobResponse = PaginationResponse & {
  data: ImportJob
}

export type ImportJobStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'PROCESSING'

export type CreateImportJobInput = {
  status: ImportJobStatus
  handler: string
  data: { [key: string]: any }
  result?: { [key: string]: any } | null
}

export type ExportImportJobInput = {
  status: ImportJobStatus
}

export type FinalizeImportJobInput = {
  total_batch_count: number
}
