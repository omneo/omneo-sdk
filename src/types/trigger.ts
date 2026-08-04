import { PaginationResponse } from './pagination'
import { ActionBase } from './action'

export type TriggerAction = ActionBase

export type Trigger = {
  id: number
  name: string
  trigger: string
  description: string | null
  notes: string | null
  actions: TriggerAction[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export type TriggerResponse = PaginationResponse & {
  data: Trigger[]
}

export type TriggerInput = Omit<Partial<Trigger>, 'id' | 'created_at' | 'updated_at'> & {
  name: Trigger['name']
  trigger: Trigger['trigger']
}

export type TriggerUpdateInput = Omit<Partial<Trigger>, 'id' | 'created_at' | 'updated_at'> & {
  trigger: Trigger['trigger']
}

export type TriggerActionInput = Omit<Partial<TriggerAction>, 'id' | 'created_at' | 'updated_at'> & {
  name: TriggerAction['name']
}

export type TriggerActionResponse = PaginationResponse & {
  data: TriggerAction[]
}
