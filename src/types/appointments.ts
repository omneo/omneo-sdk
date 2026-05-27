// Route category: appointments

import type { AnyJsonRecord, AnyRecord, FilterOperator, LocationWithTimezone, ProfileSummary } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { AppointmentDefinition } from './appointment-definitions'

export type RequestAppointmentLinkAction = {
  id: string
  type: 'profile' | 'list'
}

export type AppointmentAnswersItem = {
  questionnaire_question_id?: number | null
  value?: string
}

export type AppointmentOrder = {
  external_id?: string
  id?: number
  order_number?: string
  receipt_ref?: string
}

export type AppointmentTransaction = {
  external_id?: string
  id?: number
  receipt_ref?: string
}

export type RequestQueryAppointment = {
  offset?: number
  limit?: number
  filter?: {
    appointment_definition_id?: string | FilterOperator
    profile_id?: string | FilterOperator
    location_id?: string | FilterOperator
    assigned_staff_id?: string | FilterOperator
    questionnaire_version_id?: string | FilterOperator
    status?: string | FilterOperator
    scheduled_start_at?: string | FilterOperator
    scheduled_end_at?: string | FilterOperator
    timezone?: string | FilterOperator
    approved_at?: string | FilterOperator
    confirmed_at?: string | FilterOperator
    cancelled_at?: string | FilterOperator
    arrived_at?: string | FilterOperator
    completed_at?: string | FilterOperator
    no_show_at?: string | FilterOperator
    rejected_at?: string | FilterOperator
    approved_by?: string | FilterOperator
    cancelled_by?: string | FilterOperator
    rejected_by?: string | FilterOperator
    transaction_id?: string | FilterOperator
    order_id?: string | FilterOperator
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

export type AppointmentTransactionSummary = {
  id: number
  external_id: string | null
  receipt_ref: string | null
  total: number | null
  status: string | null
}

export type AppointmentOrderSummary = {
  id: number
  external_id: string | null
  receipt_ref: string | null
  order_number: string | null
  total: number | null
  status: string | null
}

export type AppointmentLinkItem = {
  id: number
  type: string
  target_id: string
  profile?: ProfileSummary | null
  linkable?:
    | { id: number; name: string; handle: string; profile_id: string }
    | { id: number }
    | null
}

export type QuestionnaireAnswer = {
  answer_type: string
  answerable_id: number
  answerable_type: string | null
  created_at: string
  id: number
  link_target: string | null
  link_type: string
  link_write_policy: string | null
  mappable_id: number
  mappable_type: string | null
  mapped_at: string | null
  mapped_field: string | null
  mapping_error: string | null
  mapping_key: string
  mapping_status: string
  meta: AnyRecord | null
  profile_id: string
  question_handle: string
  question_id: number
  question_label: string
  question_required: boolean
  question_type: string
  question_version_id: number
  questionnaire_id: number
  questionnaire_question_id: number
  updated_at: string
  value: boolean | string | any[] | null
}

export type RequestCreateAppointment = {
  answers?: AppointmentAnswersItem[]
  appointment_definition_id: number
  assigned_staff_id?: string | null
  confirmed_at?: string | null
  location_id: number
  meta?: AnyJsonRecord | null
  notes?: string | null
  order?: AppointmentOrder
  profile_id: string
  scheduled_end_at: string
  scheduled_start_at: string
  status?: 'requested' | 'confirmed' | 'cancelled' | 'arrived' | 'completed' | 'no_show' | 'rejected'
  timezone: string
  transaction?: AppointmentTransaction
}

export type RequestUpdateAppointment = {
  appointment_definition_id?: number
  assigned_staff_id?: string | null
  confirmed_at?: string | null
  location_id?: number
  meta?: AnyJsonRecord | null
  notes?: string | null
  order?: AppointmentOrder
  profile_id?: string
  scheduled_end_at?: string
  scheduled_start_at?: string
  status?: 'requested' | 'confirmed' | 'cancelled' | 'arrived' | 'completed' | 'no_show' | 'rejected'
  timezone?: string
  transaction?: AppointmentTransaction
}

export type Appointment = {
  answers: QuestionnaireAnswer[]
  appointment_definition: AppointmentDefinition | null
  appointment_definition_id: number | null
  approved_at: string | null
  approved_by: string | null
  arrived_at: string | null
  assigned_staff: ProfileSummary | null
  assigned_staff_id: string | null
  cancelled_at: string | null
  cancelled_by: string | null
  completed_at: string | null
  confirmed_at: string | null
  created_at: string
  id: number
  links: AppointmentLinkItem[]
  location: LocationWithTimezone | null
  location_id: number | null
  meta: AnyRecord | null
  no_show_at: string | null
  notes: string | null
  order: AppointmentOrderSummary | null
  order_id: number | null
  profile: ProfileSummary | null
  profile_id: string
  rejected_at: string | null
  rejected_by: string | null
  scheduled_end_at: string | null
  scheduled_start_at: string | null
  status: string
  timezone: string | null
  transaction: AppointmentTransactionSummary | null
  transaction_id: number | null
  updated_at: string
}

export type AppointmentResponse = {
  data: Appointment[]
  meta?: PaginationMeta
  links?: PaginationLink
}
