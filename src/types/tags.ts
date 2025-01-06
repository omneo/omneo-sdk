import { PaginationResponse } from './pagination'

export type Tag = {
  id: number
  handle: string
  created_at: string
  updated_at: string
}

export type TagResponse = PaginationResponse & {
  data: Tag[]
}

export type TagInput = {
  handle: Tag['handle']
}
