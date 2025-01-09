import { PaginationResponse } from './pagination'

export type Status = {
  id: number
  name: string
  handle: string
  sort_order?: number | null
  description?: string | null
  short_description?: string | null
  long_description?: string | null
  terms_conditions?: string | null
  icon?: string | null
  image_url?: string | null
  earn_instructions?: string | null
  colour?: string | null
  text_colour?: string | null
  code?: string | null
  internal_notes?: string | null
  created_at: string
  updated_at: string
}

export type StatusResponse = PaginationResponse & {
  data: Status[]
}

export type StatusInput = Partial<Status> & { name: Status['name'], handle: Status['handle'] }
