// Route category: appointment-definitions

import type { AnyJsonRecord, AnyRecord, FilterOperator, LocationHandle } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { AppointmentBookingQuestionnaire, AppointmentLocationItem } from './appointments'
import type { Profile } from './profiles'

export type RequestListAppointmentAvailableSlots = {
  date: string
  location_id: number
  staff_id?: string | null
}

export type ListAppointmentAvailableSlotsRangeSortEnum = 'asc' | 'desc'

export type RequestListAppointmentAvailableStaff = {
  available_only?: boolean
  date: string
  location_id: number
}

export type AppointmentDefinitionBookingTypeEnum = | 'instant'
  | 'approval_required'
  | 'walk_in_only'

export type AppointmentQuestionnaireQuestionInput = {
  question_id?: number
  question_handle?: string
  question_version_id?: number | null
  mapping_key: string
  sort_order?: number
  is_required?: boolean
  visibility_condition?: AnyJsonRecord | null
  is_active?: boolean
}

export type AppointmentDefinitionNormalHoursItem = {
  available_from?: string | null
  available_until?: string | null
  day_of_week: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
}

export type AppointmentDefinitionSpecialHoursItem = {
  available_from?: string | null
  available_until?: string | null
  end_at: string
  is_repeating?: boolean
  name: string
  start_at: string
}

export type RequestCreateAppointmentDefinitionLocation = {
  is_active?: boolean
  location_id: number
}

export type RequestCreateAppointmentDefinitionStaff = {
  is_active?: boolean
  staff_id: string
}

export type RequestUpdateAppointmentDefinitionLocation = {
  is_active?: boolean
}

export type RequestUpdateAppointmentDefinitionSpecialHour = {
  available_from?: string | null
  available_until?: string | null
  end_at?: string
  is_repeating?: boolean
  name?: string
  start_at?: string
}

export type RequestUpdateAppointmentDefinitionStaff = {
  is_active?: boolean
}

export type RequestQueryAppointmentDefinition = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    handle?: string | FilterOperator
    name?: string | FilterOperator
    is_published?: string | FilterOperator
    is_archived?: string | FilterOperator
    booking_type?: string | FilterOperator
    allow_customer_booking?: string | FilterOperator
    allow_walk_in?: string | FilterOperator
    requires_staff?: string | FilterOperator
    customer_must_select_staff?: string | FilterOperator
    allow_waitlist?: string | FilterOperator
    allow_queue?: string | FilterOperator
    queue_code?: string | FilterOperator
    definitionLocations?: {
      location_id?: string | FilterOperator
      is_active?: string | FilterOperator
    }
    created_at?: string | FilterOperator
    updated_at?: string | FilterOperator
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

export type AppointmentAvailableSlotsRangeResourceMeta = {
  appointment_definition_id: number
  location_id: number
  timezone: string | null
  start_date: string
  end_date: string
  requires_staff: boolean
  customer_must_select_staff: boolean
  assigned_staff_required: boolean
  staff: {
    id: number
    first_name: string | null
    last_name: string | null
    email: string
  } | null
  slot_interval_minutes: number | null
  duration_minutes: number
  buffer_before_minutes: number
  buffer_after_minutes: number
  min_lead_minutes: number
  max_advance_days: number | null
  max_concurrent_bookings: number | null
  total: number
}

export type AppointmentAvailableSlotsResourceData = {
  date: string
  timezone: string | null
  appointment_definition_id: number
  location_id: number
  requires_staff: boolean
  customer_must_select_staff: boolean
  assigned_staff_required: boolean
  staff: {
    id: number
    first_name: string | null
    last_name: string | null
    email: string
  } | null
  slots: string[]
}

export type AppointmentAvailableSlotsResourceMeta = {
  slot_interval_minutes: number | null
  duration_minutes: number | null
  buffer_before_minutes: number
  buffer_after_minutes: number
  min_lead_minutes: number
  max_advance_days: number | null
  max_concurrent_bookings: number | null
}

export type AppointmentDefinitionLocation = {
  appointment_definition_id: number
  created_at: string
  id: number
  is_active: boolean
  location: LocationHandle | null
  location_id: number
  updated_at: string
}

export type AppointmentDefinitionNormalHour = {
  appointment_definition_id: number
  available_from: string | null
  available_until: string | null
  created_at: string
  day_of_week: string
  id: number
  is_closed: boolean
  updated_at: string
}

export type AppointmentDefinitionSpecialHour = {
  appointment_definition_id: number
  available_from: string | null
  available_until: string | null
  created_at: string
  end_at: string | null
  id: number
  is_closed: boolean
  is_repeating: boolean
  name: string | null
  start_at: string | null
  updated_at: string
}

export type AppointmentDefinitionStaff = {
  appointment_definition_id: number
  created_at: string
  id: number
  is_active: boolean
  staff: Profile | null
  staff_id: string
  updated_at: string
}

export type AppointmentQuestionnaireInfo = {
  id: number
  name: string
  purpose: string
}

export type AppointmentQuestionVersion = {
  id: number
  version: number
  label: string | null
  description: string | null
  help_text: string | null
  type: string
  options: AnyJsonRecord | null
  validation: AnyJsonRecord | null
  default_value: string | null
}

export type AppointmentQuestionInfo = {
  id: number
  handle: string
  name: string
}

export type AppointmentAvailableStaff = {
  id: number
  first_name: string
  last_name: string
  email: string
  has_available_slots: boolean
  is_default_location: boolean
  appointment_definition_staff_sort_order: number | null
  location_profile_sort_order: number | null
}

export type AppointmentAvailableStaffMeta = {
  appointment_definition_id: number
  location_id: number
  date: string
  requires_staff: boolean
  customer_must_select_staff: boolean
  selection_required_by_customer: boolean
  assigned_staff_required: boolean
}

export type RequestListAppointmentAvailableSlotsRange = {
  end_date: string
  location_id: number
  sort?: ListAppointmentAvailableSlotsRangeSortEnum
  staff_id?: string | null
  start_date: string
}

export type AppointmentQuestionnaireInput = {
  name: string
  handle?: string | null
  description?: string | null
  is_active?: boolean
  meta?: AnyJsonRecord | null
  questions?: AppointmentQuestionnaireQuestionInput[]
}

export type RequestCreateAppointmentDefinitionNormalHour = AppointmentDefinitionNormalHoursItem

export type RequestUpdateAppointmentDefinitionNormalHour = AppointmentDefinitionNormalHoursItem[]

export type RequestCreateAppointmentDefinitionSpecialHour = AppointmentDefinitionSpecialHoursItem

export type AppointmentAvailableSlotsRangeResource = {
  data: string[]
  meta: AppointmentAvailableSlotsRangeResourceMeta
}

export type AppointmentAvailableSlotsResource = {
  data: AppointmentAvailableSlotsResourceData
  meta: AppointmentAvailableSlotsResourceMeta
}

export type AppointmentDefinitionLocationResponse = {
  data: AppointmentDefinitionLocation[]
}

export type AppointmentDefinitionNormalHourResponse = {
  data: AppointmentDefinitionNormalHour[]
}

export type AppointmentDefinitionSpecialHourResponse = {
  data: AppointmentDefinitionSpecialHour[]
}

export type AppointmentDefinitionStaffResponse = {
  data: AppointmentDefinitionStaff[]
}

export type AppointmentDefinition = {
  allow_customer_booking: boolean
  allow_queue: boolean
  allow_waitlist: boolean
  allow_walk_in: boolean
  booking_questionnaire: AppointmentBookingQuestionnaire | undefined
  booking_type: AppointmentDefinitionBookingTypeEnum
  buffer_after_minutes: number | null
  buffer_before_minutes: number | null
  cancelled_target_id: number
  confirmed_target_id: number
  created_at: string
  created_target_id: number
  customer_must_select_staff: boolean
  description: string | null
  duration_minutes: number | null
  handle: string | null
  has_booking_questionnaire: boolean
  id: number
  is_archived: boolean
  is_published: boolean
  locations: AppointmentLocationItem[]
  max_advance_days: number | null
  max_concurrent_bookings: number | null
  meta: AnyRecord | null
  min_lead_minutes: number | null
  name: string | null
  normal_hours: AppointmentDefinitionNormalHour[]
  notify_cancelled_offset_days: number | null
  notify_cancelled_offset_hours: number | null
  notify_confirmed_offset_days: number | null
  notify_confirmed_offset_hours: number | null
  notify_created_offset_days: number | null
  notify_created_offset_hours: number | null
  notify_rejected_offset_days: number | null
  notify_rejected_offset_hours: number | null
  notify_reminder_offset_days: number | null
  notify_reminder_offset_hours: number | null
  rejected_target_id: number
  reminder_target_id: number
  requires_staff: boolean
  slot_interval_minutes: number | null
  special_hours: AppointmentDefinitionSpecialHour[]
  staff: AppointmentDefinitionStaff[]
  updated_at: string
  use_staff_from_location: boolean
}

export type AppointmentQuestionnaireQuestion = {
  id: number
  questionnaire_question_id: number
  questionnaire_id: number
  question_id: number
  question_version_id: number
  mapping_key: string | null
  sort_order: number
  is_required: boolean
  target: string | null
  mapping_config: AnyJsonRecord | null
  visibility_condition: AnyJsonRecord | null
  visibility_dependencies: string[]
  is_active: boolean
  question: AppointmentQuestionInfo | null
  version: AppointmentQuestionVersion | null
  created_at: string
  updated_at: string
}

export type AppointmentAvailabilityStaffResponse = {
  data: AppointmentAvailableStaff[]
  meta: AppointmentAvailableStaffMeta
}

export type RequestCreateAppointmentDefinition = {
  allow_customer_booking?: boolean
  allow_queue?: boolean
  allow_waitlist?: boolean
  allow_walk_in?: boolean
  booking_questionnaire?: AppointmentQuestionnaireInput
  booking_type: AppointmentDefinitionBookingTypeEnum
  buffer_after_minutes?: number
  buffer_before_minutes?: number
  cancelled_target_id?: number | null
  confirmed_target_id?: number | null
  created_target_id?: number | null
  customer_must_select_staff?: boolean
  description?: string | null
  duration_minutes: number
  handle: string
  is_archived?: boolean
  is_published?: boolean
  location_ids?: number[]
  max_advance_days?: number | null
  max_concurrent_bookings?: number | null
  meta?: AnyJsonRecord | null
  min_lead_minutes?: number
  name: string
  normal_hours: AppointmentDefinitionNormalHoursItem[] | null
  notify_cancelled_offset_days?: number | null
  notify_cancelled_offset_hours?: number | null
  notify_confirmed_offset_days?: number | null
  notify_confirmed_offset_hours?: number | null
  notify_created_offset_days?: number | null
  notify_created_offset_hours?: number | null
  notify_rejected_offset_days?: number | null
  notify_rejected_offset_hours?: number | null
  notify_reminder_offset_days?: number | null
  notify_reminder_offset_hours?: number | null
  rejected_target_id?: number | null
  reminder_target_id?: number | null
  requires_staff?: boolean
  slot_interval_minutes?: number | null
  special_hours?: AppointmentDefinitionSpecialHoursItem[] | null
  staff_ids?: string[]
  use_staff_from_location?: boolean
}

export type RequestUpdateAppointmentDefinition = {
  allow_customer_booking?: boolean
  allow_queue?: boolean
  allow_waitlist?: boolean
  allow_walk_in?: boolean
  booking_questionnaire?: AppointmentQuestionnaireInput
  booking_type?: AppointmentDefinitionBookingTypeEnum
  buffer_after_minutes?: number
  buffer_before_minutes?: number
  cancelled_target_id?: number | null
  confirmed_target_id?: number | null
  created_target_id?: number | null
  customer_must_select_staff?: boolean
  description?: string | null
  duration_minutes?: number
  handle?: string
  is_archived?: boolean
  is_published?: boolean
  location_ids?: number[]
  max_advance_days?: number | null
  max_concurrent_bookings?: number | null
  meta?: AnyJsonRecord | null
  min_lead_minutes?: number
  name?: string
  normal_hours?: AppointmentDefinitionNormalHoursItem[] | null
  notify_cancelled_offset_days?: number | null
  notify_cancelled_offset_hours?: number | null
  notify_confirmed_offset_days?: number | null
  notify_confirmed_offset_hours?: number | null
  notify_created_offset_days?: number | null
  notify_created_offset_hours?: number | null
  notify_rejected_offset_days?: number | null
  notify_rejected_offset_hours?: number | null
  notify_reminder_offset_days?: number | null
  notify_reminder_offset_hours?: number | null
  rejected_target_id?: number | null
  reminder_target_id?: number | null
  requires_staff?: boolean
  slot_interval_minutes?: number | null
  special_hours?: AppointmentDefinitionSpecialHoursItem[] | null
  staff_ids?: string[]
  use_staff_from_location?: boolean
}

export type AppointmentDefinitionResponse = {
  data: AppointmentDefinition[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type AppointmentDefinitionQuestionsResponse = {
  data: {
    questionnaire: AppointmentQuestionnaireInfo | null
    questions: AppointmentQuestionnaireQuestion[]
  }
}
