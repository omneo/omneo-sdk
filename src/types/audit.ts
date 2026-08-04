import { PaginationResponse } from './pagination'

export type Audit = {
  id: number
  user_id: number | null
  event: string
  auditable_type: string
  auditable_id: number | null
  old_values: { [key: string]: any } | null
  new_values: { [key: string]: any } | null
  url: string | null
  ip_address: string | null
  profile_id: string | null
  location_id: number | null
  location: {
    id: number
    name: string | null
    handle: string | null
    external_id: string | null
  } | null
  staff_id: string | null
  staff: {
    id: string
    first_name: string
    last_name: string
    email: string
  } | null
  token_name: string | null
  user_agent: string | null
  created_at: string
  updated_at: string
}

export type AuditResponse = PaginationResponse & {
  data: Audit[]
}

export type CreateAuditInput = {
  event: string
  auditable_type: string
  auditable_id?: number | null
  old_values?: { [key: string]: any } | null
  new_values?: { [key: string]: any } | null
  url?: string | null
  ip_address?: string | null
  user_agent?: string | null
  profile_id?: string | null
  location_id?: number | null
  staff_id?: string | null
}

export type UpdateAuditInput = Partial<CreateAuditInput>
