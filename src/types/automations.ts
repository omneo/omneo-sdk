import { PaginationResponse } from './pagination'

export type AutomationArgument = {
  name: string
  value: string | number | boolean | { var: string }
  is_dynamic?: boolean | null
}

export type AutomationAction = {
  id: number
  uuid: string
  references_id: number | null
  name: string
  sort_order: number
  description: string
  notes: string
  arguments: AutomationArgument[]
  created_at: string
  updated_at: string
}

export type Automation = {
  id: number
  name: string
  type: string
  query: string
  date: string | null
  arguments: AutomationArgument[]
  slot: string
  actions: AutomationAction[]
  description: string | null
  notes: string | null
  is_active: boolean
  frequency: string | null
  run_at: string | null
  last_run_at: string
  created_at: string
  updated_at: string
}

export type AutomationInput = Partial<Omit<Automation, 'id' | 'created_at' | 'updated_at'>> & {
  type: Automation['type']
  query: Automation['query']
}

export type AutomationResponse = PaginationResponse & {
  data: Automation[]
}

export type AutomationActionResponse = PaginationResponse & {
  data: AutomationAction[]
}
