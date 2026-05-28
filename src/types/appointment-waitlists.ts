// Route category: appointment-waitlists

import type { AnyJsonRecord, AnyRecord, FilterOperator, LocationWithTimezone, ProfileSummary } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateAppointmentWaitlist = {
  appointment_definition_id: number
  appointment_id?: number | null
  desired_start_at?: string | null
  location_id: number
  meta?: AnyJsonRecord | null
  notes?: string | null
  profile_id: string
  status?: 'active' | 'fulfilled' | 'cancelled'
}

export type RequestUpdateAppointmentWaitlist = {
  appointment_id?: number | null
  desired_start_at?: string | null
  meta?: AnyJsonRecord | null
  notes?: string | null
  status?: 'active' | 'fulfilled' | 'cancelled'
}

export type RequestQueryAppointmentWaitlist = {
  offset?: number
  limit?: number
  filter?: {
    appointment_definition_id?: string | FilterOperator
    profile_id?: string | FilterOperator
    location_id?: string | FilterOperator
    appointment_id?: string | FilterOperator
    status?: string | FilterOperator
    desired_start_at?: string | FilterOperator
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
  [key: string]: any
}

export type AppointmentWaitlist = {
  appointment_definition_id: number
  appointment_id: number
  created_at: string
  desired_start_at: string | null
  id: number
  location: LocationWithTimezone | null
  location_id: number
  meta: AnyRecord | null
  notes: string | null
  profile: ProfileSummary | null
  profile_id: string
  status: string
  updated_at: string
}

export type AppointmentWaitlistResponse = {
  data: AppointmentWaitlist[]
  meta?: PaginationMeta
  links?: PaginationLink
}
