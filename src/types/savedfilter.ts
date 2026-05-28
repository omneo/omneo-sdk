// Route category: savedfilter

import type { AnyJsonRecord } from './common'

export type RequestCreateSavedFilter = {
  filters: string
  name: string
}

export type RequestUpdateSavedFilter = {
  filters: string
  name: string
}

export type SavedFilter = {
  created_at: string | null
  filters: AnyJsonRecord[]
  id: number
  model_type: string
  name: string | null
  updated_at: string | null
}

export type SavedFilterResponse = {
  data: SavedFilter[]
}
