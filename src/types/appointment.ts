import { PaginationResponse } from './pagination'

export type AppointmentStatus = 'requested' | 'confirmed' | 'cancelled' | 'arrived' | 'completed' | 'no_show' | 'rejected'
export type AppointmentBookingType = 'instant' | 'approval_required' | 'walk_in_only'
export type AppointmentQueueStatus = 'waiting' | 'called' | 'served' | 'cancelled'
export type AppointmentWaitlistStatus = 'active' | 'fulfilled' | 'cancelled'
export type AppointmentDayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
export type AppointmentLinkType = 'profile' | 'list'

export type AppointmentProfileSummary = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
}

export type AppointmentLocationSummary = {
  id: number
  name: string
  handle: string
  timezone: string | null
}

export type AppointmentDefinitionNormalHour = {
  id: number
  appointment_definition_id: number
  day_of_week: AppointmentDayOfWeek
  available_from: string | null
  available_until: string | null
  is_closed: boolean
  created_at: string
  updated_at: string
}

export type CreateAppointmentDefinitionNormalHourInput = {
  day_of_week: AppointmentDayOfWeek
  available_from?: string | null
  available_until?: string | null
}

export type UpdateAppointmentDefinitionNormalHourInput = Partial<CreateAppointmentDefinitionNormalHourInput>

export type AppointmentDefinitionSpecialHour = {
  id: number
  appointment_definition_id: number
  name: string
  is_repeating: boolean
  available_from: string | null
  available_until: string | null
  start_at: string
  end_at: string
  is_closed: boolean
  created_at: string
  updated_at: string
}

export type CreateAppointmentDefinitionSpecialHourInput = {
  name: string
  start_at: string
  end_at: string
  is_repeating?: boolean
  available_from?: string | null
  available_until?: string | null
}

export type UpdateAppointmentDefinitionSpecialHourInput = Partial<CreateAppointmentDefinitionSpecialHourInput>

export type AppointmentDefinitionLocation = {
  id: number
  appointment_definition_id: number
  location_id: number
  is_active: boolean
  location: {
    id: number
    name: string
    handle: string
    [key: string]: any
  } | null
  created_at: string
  updated_at: string
}

export type CreateAppointmentDefinitionLocationInput = {
  location_id: number
  is_active?: boolean
}

export type UpdateAppointmentDefinitionLocationInput = {
  is_active?: boolean
}

export type AppointmentDefinitionStaff = {
  id: number
  appointment_definition_id: number
  staff_id: string
  is_active: boolean
  staff: {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
    mobile_phone: string | null
    [key: string]: any
  } | null
  created_at: string
  updated_at: string
}

export type CreateAppointmentDefinitionStaffInput = {
  staff_id: string
  is_active?: boolean
}

export type UpdateAppointmentDefinitionStaffInput = {
  is_active?: boolean
}

export type AppointmentBookingQuestionnaireQuestionInput = {
  mapping_key: string
  question_id?: number
  question_handle?: string
  question_version_id?: number | null
  sort_order?: number
  is_required?: boolean
  visibility_condition?: { [key: string]: any } | null
  is_active?: boolean
}

export type AppointmentBookingQuestionnairePageInput = {
  title?: string | null
  description?: string | null
  image_url?: string | null
  section_header?: string | null
  sort_order?: number
  questions?: AppointmentBookingQuestionnaireQuestionInput[]
}

export type AppointmentBookingQuestionnaireInput = {
  name?: string
  handle?: string | null
  description?: string | null
  is_active?: boolean
  meta?: { [key: string]: any } | null
  questions?: AppointmentBookingQuestionnaireQuestionInput[]
  pages?: AppointmentBookingQuestionnairePageInput[]
}

export type AppointmentDefinition = {
  id: number
  handle: string
  name: string
  description: string | null
  short_description: string | null
  long_description: string | null
  icon: string | null
  image_url: string | null
  terms_conditions: string | null
  internal_notes: string | null
  visibility_condition: { [key: string]: any } | null
  is_published: boolean
  is_archived: boolean
  duration_minutes: number
  buffer_before_minutes: number
  buffer_after_minutes: number
  min_lead_minutes: number
  max_advance_days: number | null
  slot_interval_minutes: number | null
  booking_type: AppointmentBookingType
  allow_customer_booking: boolean
  allow_walk_in: boolean
  requires_staff: boolean
  customer_must_select_staff: boolean
  use_staff_from_location: boolean
  max_concurrent_bookings: number | null
  allow_waitlist: boolean
  allow_queue: boolean
  queue_code?: string | null
  meta: { [key: string]: any } | null
  created_target_id: number | null
  confirmed_target_id: number | null
  cancelled_target_id: number | null
  rejected_target_id: number | null
  reminder_target_id: number | null
  completed_target_id: number | null
  notify_created_offset_days: number | null
  notify_created_offset_hours: number | null
  notify_confirmed_offset_days: number | null
  notify_confirmed_offset_hours: number | null
  notify_cancelled_offset_days: number | null
  notify_cancelled_offset_hours: number | null
  notify_rejected_offset_days: number | null
  notify_rejected_offset_hours: number | null
  notify_reminder_offset_days: number | null
  notify_reminder_offset_hours: number | null
  notify_completed_offset_days: number | null
  notify_completed_offset_hours: number | null
  has_booking_questionnaire: boolean
  normal_hours?: AppointmentDefinitionNormalHour[]
  special_hours?: AppointmentDefinitionSpecialHour[]
  locations?: AppointmentDefinitionLocation[]
  staff?: AppointmentDefinitionStaff[]
  booking_questionnaire?: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

type AppointmentDefinitionEditable = Omit<AppointmentDefinition, 'id' | 'queue_code' | 'has_booking_questionnaire' | 'normal_hours' | 'special_hours' | 'locations' | 'staff' | 'booking_questionnaire' | 'created_at' | 'updated_at'>
type AppointmentDefinitionCreateRequiredField = 'handle' | 'name' | 'duration_minutes' | 'booking_type'

export type CreateAppointmentDefinitionInput =
  Required<Pick<AppointmentDefinitionEditable, AppointmentDefinitionCreateRequiredField>> &
  Partial<Omit<AppointmentDefinitionEditable, AppointmentDefinitionCreateRequiredField>> & {
    location_ids?: number[]
    staff_ids?: string[]
    normal_hours?: CreateAppointmentDefinitionNormalHourInput[]
    special_hours?: CreateAppointmentDefinitionSpecialHourInput[]
    booking_questionnaire?: AppointmentBookingQuestionnaireInput
  }

export type UpdateAppointmentDefinitionInput = Partial<Omit<CreateAppointmentDefinitionInput, 'handle'>>

export type AppointmentDefinitionResponse = PaginationResponse & {
  data: AppointmentDefinition[]
}

export type AppointmentDefinitionQuestions = {
  questionnaire: { [key: string]: any } | null
  questions: any[]
}

export type AppointmentAvailableSlotsInput = {
  location_id: number
  date: string
  staff_id?: string | null
}

export type AppointmentAvailabilityMeta = {
  slot_interval_minutes: number | null
  duration_minutes: number
  buffer_before_minutes: number
  buffer_after_minutes: number
  min_lead_minutes: number
  max_advance_days: number | null
  max_concurrent_bookings: number | null
}

export type AppointmentSlot = {
  time: string
  label: string
  start_at: string
  end_at: string
  duration_minutes: number
  capacity_remaining: number | null
}

export type AppointmentAvailableSlots = {
  date: string
  timezone: string | null
  appointment_definition_id: number
  location_id: number
  requires_staff: boolean
  customer_must_select_staff: boolean
  assigned_staff_required: boolean
  staff: AppointmentProfileSummary | null
  slots: AppointmentSlot[]
}

export type AppointmentAvailableSlotsResponse = {
  data: AppointmentAvailableSlots
  meta: AppointmentAvailabilityMeta
}

export type AppointmentAvailableSlotsRangeInput = {
  location_id: number
  start_date: string
  end_date: string
  staff_id?: string | null
  sort?: 'asc' | 'desc'
}

export type AppointmentAvailableSlotsRangeResponse = {
  data: AppointmentSlot[]
  meta: AppointmentAvailabilityMeta & {
    appointment_definition_id: number
    location_id: number
    timezone: string | null
    start_date: string
    end_date: string
    requires_staff: boolean
    customer_must_select_staff: boolean
    assigned_staff_required: boolean
    staff: AppointmentProfileSummary | null
    total: number
  }
}

export type AppointmentAvailableStaffInput = {
  location_id: number
  date: string
  available_only?: boolean
}

export type AppointmentAvailableStaffMember = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  has_available_slots: boolean
  is_default_location: boolean
  appointment_definition_staff_sort_order?: number | null
  location_profile_sort_order?: number | null
}

export type AppointmentAvailableStaffResponse = {
  data: AppointmentAvailableStaffMember[]
  meta: {
    appointment_definition_id: number
    location_id: number
    date: string
    requires_staff: boolean
    customer_must_select_staff: boolean
    selection_required_by_customer: boolean
    assigned_staff_required: boolean
  }
}

export type AppointmentTransactionResolver = {
  id?: number
  external_id?: string
  receipt_ref?: string
}

export type AppointmentOrderResolver = {
  id?: number
  external_id?: string
  receipt_ref?: string
  order_number?: string
}

export type AppointmentAnswer = {
  id: number
  questionnaire_question_id: number
  question_id: number
  question_handle: string
  question_version_id: number
  mapping_key: string
  link_type: string | null
  link_target: string | null
  question_label: string
  question_type: string
  value: string
  mapping_status: string
  mapping_error: string | null
  mapped_at: string | null
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type AppointmentLink = {
  id: number
  type: AppointmentLinkType
  target_id: string | number
  profile: AppointmentProfileSummary | null
  linkable: { [key: string]: any } | null
}

export type Appointment = {
  id: number
  appointment_definition_id: number
  appointment_definition: AppointmentDefinition | null
  profile_id: string
  profile: AppointmentProfileSummary | null
  location_id: number
  location: AppointmentLocationSummary | null
  assigned_staff_id: string | null
  assigned_staff: AppointmentProfileSummary | null
  status: AppointmentStatus
  scheduled_start_at: string
  scheduled_end_at: string
  timezone: string
  approved_at: string | null
  confirmed_at: string | null
  cancelled_at: string | null
  arrived_at: string | null
  completed_at: string | null
  no_show_at: string | null
  rejected_at: string | null
  approved_by: string | null
  cancelled_by: string | null
  rejected_by: string | null
  transaction_id: number | null
  order_id: number | null
  transaction: { [key: string]: any } | null
  order: { [key: string]: any } | null
  answers: AppointmentAnswer[]
  links?: AppointmentLink[] // Only returned by the link endpoint, not by reads
  notes: string | null
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type CreateAppointmentAnswerInput = {
  questionnaire_question_id?: number
  value: string
}

export type CreateAppointmentInput = {
  appointment_definition_id: number
  profile_id: string
  location_id: number
  scheduled_start_at: string
  scheduled_end_at: string
  timezone: string
  assigned_staff_id?: string | null
  status?: AppointmentStatus
  confirmed_at?: string | null
  notes?: string | null
  meta?: { [key: string]: any } | null
  transaction?: AppointmentTransactionResolver | null
  order?: AppointmentOrderResolver | null
  answers?: CreateAppointmentAnswerInput[]
}

export type CreateProfileAppointmentInput = Omit<CreateAppointmentInput, 'profile_id'>

export type UpdateAppointmentInput = Partial<Omit<CreateAppointmentInput, 'answers'>>

export type AppointmentResponse = PaginationResponse & {
  data: Appointment[]
}

export type AppointmentLinkInput = {
  type: AppointmentLinkType
  id: string | number
}

export type AppointmentQueue = {
  id: number
  appointment_definition_id: number
  profile_id: string | null
  profile: AppointmentProfileSummary | null
  location_id: number
  location: AppointmentLocationSummary | null
  staff_id: string | null
  staff: AppointmentProfileSummary | null
  appointment_id: number | null
  status: AppointmentQueueStatus
  notes: string | null
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type CreateAppointmentQueueInput = {
  appointment_definition_id: number
  location_id: number
  profile_id?: string | null
  staff_id?: string | null
  appointment_id?: number | null
  status?: AppointmentQueueStatus
  notes?: string | null
  meta?: { [key: string]: any } | null
}

export type UpdateAppointmentQueueInput = {
  staff_id?: string | null
  appointment_id?: number | null
  status?: AppointmentQueueStatus
  notes?: string | null
  meta?: { [key: string]: any } | null
}

export type AppointmentQueueResponse = PaginationResponse & {
  data: AppointmentQueue[]
}

export type AppointmentWaitlist = {
  id: number
  appointment_definition_id: number
  profile_id: string
  profile: AppointmentProfileSummary | null
  location_id: number
  location: AppointmentLocationSummary | null
  appointment_id: number | null
  status: AppointmentWaitlistStatus
  desired_start_at: string | null
  notes: string | null
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type CreateAppointmentWaitlistInput = {
  appointment_definition_id: number
  profile_id: string
  location_id: number
  appointment_id?: number | null
  status?: AppointmentWaitlistStatus
  desired_start_at?: string | null
  notes?: string | null
  meta?: { [key: string]: any } | null
}

export type UpdateAppointmentWaitlistInput = {
  appointment_id?: number | null
  status?: AppointmentWaitlistStatus
  desired_start_at?: string | null
  notes?: string | null
  meta?: { [key: string]: any } | null
}

export type AppointmentWaitlistResponse = PaginationResponse & {
  data: AppointmentWaitlist[]
}

export type ProfileNormalHour = {
  id: number
  profile_id: string
  day_of_week: AppointmentDayOfWeek
  available_from: string | null
  available_until: string | null
  is_closed: boolean
  created_at: string
  updated_at: string
}

export type CreateProfileNormalHourInput = {
  day_of_week: AppointmentDayOfWeek
  available_from?: string | null
  available_until?: string | null
}

export type UpdateProfileNormalHourInput = Partial<CreateProfileNormalHourInput>

export type ProfileSpecialHour = {
  id: number
  profile_id: string
  name: string
  is_repeating: boolean
  available_from: string | null
  available_until: string | null
  start_at: string
  end_at: string
  is_closed: boolean
  created_at: string
  updated_at: string
}

export type CreateProfileSpecialHourInput = {
  name: string
  start_at: string
  end_at: string
  is_repeating?: boolean
  available_from?: string | null
  available_until?: string | null
}

export type UpdateProfileSpecialHourInput = Partial<CreateProfileSpecialHourInput>
