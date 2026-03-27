import { PaginationResponse } from './pagination'

export type Reminder = {
  id: number
  timezone: string | null
  schedule_type: string | null
  remind_at: string | null
  period_unit: string | null
  period_value: number | null
  period_time_at: string | null
  repeat_unit: string | null
  repeat_value: number | null
  repeat_time_at: string | null
  channel: string | null
  note: string | null
  recipient: string | null
  is_active: boolean
  is_valid: boolean
  expires_at: string | null
  created_at: string
  updated_at: string
}

export type ReminderResponse = PaginationResponse & {
   data: Reminder[]
}

export type ReminderScheduleType = 'absolute' | 'period' | 'repeat'
export type ReminderPeriodUnit = 'days' | 'weeks' | 'months' | 'years'
export type ReminderRepeatUnit = 'daily' | 'weekly' | 'monthly'
export type ReminderChannel = 'slack' | 'email'

export type CreateReminderInput = {
  timezone?: string | null
  schedule_type: ReminderScheduleType
  remind_at?: string | null
  period_unit?: ReminderPeriodUnit | null
  period_value?: number | string | null
  period_time_at?: string | null
  repeat_unit?: ReminderRepeatUnit | null
  repeat_value?: number | string | null
  repeat_time_at?: string | null
  channel: ReminderChannel
  note: string
  recipient?: string | null
  is_active?: boolean | null
  expires_at?: string | null
}

export type UpdateReminderInput = Omit<
  Partial<CreateReminderInput>,
  'period_value' | 'repeat_value'
> & {
  period_value?: number | null
  repeat_value?: number | null
}
