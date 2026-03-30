import { PaginationResponse } from './pagination'
import { ActionBase, ActionArgument } from './action'

export type AutomationAction = ActionBase
export type Automation = {
  id: number
  name: string
  type: string
  query: string
  date: string | null
  arguments: ActionArgument[]
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

export type CreateAutomationActionInput = {
  name: string
  sort_order?: number | null
  arguments?: Pick<ActionArgument, 'name' | 'value' | 'is_dynamic'>[] | null
  description?: string | null
  notes?: string | null
}

export type UpdateAutomationActionInput = Partial<CreateAutomationActionInput>

export type AutomationResponse = PaginationResponse & {
  data: Automation[]
}

export type AutomationActionResponse = PaginationResponse & {
  data: AutomationAction[]
}
