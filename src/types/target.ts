import { PaginationResponse } from './pagination'

export type Target = {
  id: number
  url: string
  name: string
  handle: string
  template: string // Stringified JSON
  description: string | null
  notes: string | null
  condition: string | null // Stringified JSON Logic
  created_at: string
  updated_at: string
}

export type TargetResponse = PaginationResponse & {
  data: Target[]
}

export type TargetInput = {
  name: Target['name']
  url: Target['url']
  handle: Target['handle']
  template: Target['template']
  notes?: Target['notes']
  condition?: Target['condition']
  description?: Target['description']
}
