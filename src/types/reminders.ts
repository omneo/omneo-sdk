// Route category: reminders

import type { FilterOperator } from './common'

export type ReminderScheduleTypeEnum = 'absolute' | 'period' | 'repeat'

export type ReminderPeriodUnitEnum = 'days' | 'weeks' | 'months' | 'years'

export type ReminderRepeatUnitEnum = 'daily' | 'weekly' | 'monthly'

export type ReminderChannelEnum = 'slack' | 'email'

export type RequestQueryReminder = {
  offset?: number
  limit?: number
  filter?: {
    timezone?: string | FilterOperator
    schedule_type?: string | FilterOperator
    remind_at?: string | FilterOperator
    period_unit?: string | FilterOperator
    period_value?: string | FilterOperator
    period_time_at?: string | FilterOperator
    repeat_unit?: string | FilterOperator
    repeat_value?: string | FilterOperator
    repeat_time_at?: string | FilterOperator
    channel?: string | FilterOperator
    note?: string | FilterOperator
    username?: string | FilterOperator
    is_active?: string | FilterOperator
    expires_at?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
}

export type RequestCreateReminder = {
  channel: ReminderChannelEnum
  expires_at?: string | null
  is_active?: boolean | null
  note: string
  period_time_at?: string | null
  period_unit?: ReminderPeriodUnitEnum | null
  period_value?: string | null
  recipient?: string | null
  remind_at?: string | null
  repeat_time_at?: string | null
  repeat_unit?: ReminderRepeatUnitEnum | null
  repeat_value?: string | null
  schedule_type: ReminderScheduleTypeEnum
  timezone?: string | null
}

export type RequestUpdateReminder = {
  channel?: ReminderChannelEnum
  expires_at?: string | null
  is_active?: boolean | null
  note?: string
  period_time_at?: string | null
  period_unit?: ReminderPeriodUnitEnum | null
  period_value?: number | null
  recipient?: string | null
  remind_at?: string | null
  repeat_time_at?: string | null
  repeat_unit?: ReminderRepeatUnitEnum | null
  repeat_value?: number | null
  schedule_type?: ReminderScheduleTypeEnum
  timezone?: string | null
}

export type Reminder = {
  channel: ReminderChannelEnum
  created_at: string
  expires_at: string | null
  id: number
  is_active: boolean
  is_valid: boolean
  note: string
  period_time_at: string | null
  period_unit: ReminderPeriodUnitEnum
  period_value: number | null
  recipient: string | null
  remind_at: string | null
  repeat_time_at: string | null
  repeat_unit: ReminderRepeatUnitEnum
  repeat_value: number | null
  schedule_type: ReminderScheduleTypeEnum
  timezone: string | null
  updated_at: string
}

export type ReminderResponse = {
  data: Reminder[]
}
