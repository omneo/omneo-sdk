import { PaginationResponse } from './pagination'

export type SavedFilter = {
  id: number
  model_type: string
  name: string
  filters: { [key: string]: any }[]
  created_at: string | null
  updated_at: string | null
}

export type SavedFilterResponse = PaginationResponse & {
  data: SavedFilter[]
}

export type CreateSavedFilterInput = {
  name: string
  filters: string
}

export type UpdateSavedFilterInput = CreateSavedFilterInput
