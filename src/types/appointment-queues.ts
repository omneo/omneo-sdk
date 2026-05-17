// Route category: appointment-queues

import type { AnyJsonRecord, AnyRecord, FilterOperator, LocationWithTimezone, ProfileSummary } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateAppointmentQueue = {
  appointment_definition_id: number
  appointment_id?: number | null
  location_id: number
  meta?: AnyJsonRecord | null
  notes?: string | null
  profile_id?: string | null
  staff_id?: string | null
  status?: 'waiting' | 'called' | 'served' | 'cancelled'
}

export type RequestUpdateAppointmentQueue = {
  appointment_id?: number | null
  meta?: AnyJsonRecord | null
  notes?: string | null
  staff_id?: string | null
  status?: 'waiting' | 'called' | 'served' | 'cancelled'
}

export type RequestQueryAppointmentQueue = {
  offset?: number
  limit?: number
  filter?: {
    appointment_definition_id?: string | FilterOperator
    profile_id?: string | FilterOperator
    location_id?: string | FilterOperator
    staff_id?: string | FilterOperator
    appointment_id?: string | FilterOperator
    status?: string | FilterOperator
    notes?: string | FilterOperator
    meta?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
}

export type AppointmentQueue = {
  appointment_definition_id: number
  appointment_id: number
  created_at: string
  id: number
  location: LocationWithTimezone | null
  location_id: number
  meta: AnyRecord | null
  notes: string | null
  profile: ProfileSummary | null
  profile_id: string
  staff: ProfileSummary | null
  staff_id: string
  status: string
  updated_at: string
}

export type AppointmentQueueResponse = {
  data: AppointmentQueue[]
  meta?: PaginationMeta
  links?: PaginationLink
}
