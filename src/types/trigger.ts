import { PaginationResponse } from './pagination'

export type TriggerActionArgument = {
  name: string
  value: {
    var: string
  }
  is_dynamic: boolean | null
}

export type TriggerAction = {
  id: number
  uuid: string
  references_id: number | null
  name: string
  sort_order: number | null
  description: string | null
  notes: string | null
  arguments: TriggerActionArgument[]
  created_at: string
  updated_at: string
}

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
