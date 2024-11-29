import { PaginationResponse } from './pagination'

export type Audit = {
  id: number
  user_id: number | null
  event: string
  auditable_type: string
  auditable_id: number
  old_values: string // Stringified JSON
  new_values: string // Stringified JSON
  url: string | null
  ip_address: string | null
  profile_id: string
  token_name: string | null
  user_agent: string | null
  created_at: string
  updated_at: string
}

export type AuditResponse = PaginationResponse & {
  data: Audit[]
}
