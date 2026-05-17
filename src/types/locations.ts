// Route category: locations

import type { AnyJsonRecord, CustomFieldsGrouped, FilterOperator, PageSize } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'
import type { CustomFieldItem } from './custom-fields'
import type { Department } from './departments'
import type { Address, LocationsAddress } from './address'
export type LocationNormalHoursDayOfWeekEnum = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export type ListLocationProfilesFilterAssignmentTypeEnum = 'staff' | 'manager' | 'profile'

export type CreateLocationAddress = LocationsAddress

export type CreateLocationSpecialHoursItem = {
  close_at?: string
  end_at: string
  is_repeating?: boolean
  name: string
  open_at?: string
  start_at: string
}

export type CreateLocationProfileRoleTypeEnum = 'full_time' | 'part_time' | 'casual' | 'other'

export type UpdateLocationAddress = {
  address_line_1?: string
  address_line_2?: string | null
  address_line_3?: string | null
  city?: string
  company?: string | null
  country?: string
  is_default?: boolean | null
  iso?: string | null
  iso_state?: string | null
  latitude?: number | null
  longitude?: number | null
  notes?: string | null
  postcode?: string
  state?: string
}

export type UpdateLocationSpecialHoursItem = {
  close_at?: string
  end_at?: string
  is_repeating?: boolean | null
  name?: string
  open_at?: string
  start_at?: string
}

export type RequestQueryLocation = {
  offset?: number
  limit?: number
  filter?: {
    type?: string | FilterOperator
    name?: string | FilterOperator
    handle?: string | FilterOperator
    description?: string | FilterOperator
    phone?: string | FilterOperator
    email?: string | FilterOperator
    timezone?: string | FilterOperator
    external_id?: string | FilterOperator
    external_code?: string | FilterOperator
    is_published?: string | FilterOperator
    is_permanently_closed?: string | FilterOperator
    icon?: string | FilterOperator
    image_url?: string | FilterOperator
    country_iso_3?: string | FilterOperator
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

export type LocationSpecialHours = {
  id: number
  location_id: number
  name: string
  is_repeating: boolean
  open_at: string | null
  close_at: string | null
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
}

export type LocationBatchJsonResponse = {
  message: string
}

export type CreateLocationNormalHoursItem = {
  close_at?: string
  day_of_week: LocationNormalHoursDayOfWeekEnum
  open_at?: string
}

export type UpdateLocationNormalHoursItem = {
  close_at?: string
  day_of_week?: LocationNormalHoursDayOfWeekEnum
  open_at?: string
}

export type LocationNormalHours = {
  id: number
  location_id: number
  day_of_week: LocationNormalHoursDayOfWeekEnum
  open_at: string | null
  close_at: string | null
  created_at: string
}

export type ListLocationProfilesFilter = {
  assignment_type?: ListLocationProfilesFilterAssignmentTypeEnum
  is_active?: boolean
  is_default?: boolean
}

export type RequestCreateLocationProfile = {
  assignment_type: ListLocationProfilesFilterAssignmentTypeEnum
  ends_at?: string | null
  excluded_service_handles?: string[] | null
  external_id?: string | null
  is_active?: boolean
  is_default?: boolean
  meta?: AnyJsonRecord | null
  notes?: string | null
  profile_external_id?: string | null
  profile_id: string
  role_type?: CreateLocationProfileRoleTypeEnum | null
  sort_order?: number
  starts_at?: string | null
}

export type BatchLocationJsonItem = {
  address?: CreateLocationAddress | null
  custom_fields?: CustomFieldItem[]
  description?: string
  email?: string
  external_code?: string | null
  external_id?: string | null
  icon?: string | null
  id?: number | null
  image_url?: string | null
  is_permanently_closed?: boolean
  is_published?: boolean
  name: string
  normal_hours?: CreateLocationNormalHoursItem[] | null
  phone: string
  special_hours?: CreateLocationSpecialHoursItem[] | null
  tags?: string[]
  timezone?: string | null
  type?: string
}

export type RequestCreateLocation = {
  address?: CreateLocationAddress | null
  country_iso_3?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string
  email?: string
  external_code?: string | null
  external_id?: string | null
  handle?: string
  icon?: string | null
  image_url?: string | null
  is_permanently_closed?: boolean
  is_published?: boolean
  name: string
  normal_hours?: CreateLocationNormalHoursItem[] | null
  phone: string
  special_hours?: CreateLocationSpecialHoursItem[] | null
  tags?: string[]
  timezone?: string | null
  type?: string
}

export type RequestUpdateLocation = {
  address?: UpdateLocationAddress | null
  country_iso_3?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  email?: string
  external_code?: string | null
  external_id?: string | null
  icon?: string | null
  image_url?: string | null
  is_permanently_closed?: boolean
  is_published?: boolean
  name?: string
  normal_hours?: UpdateLocationNormalHoursItem[] | null
  phone?: string
  special_hours?: UpdateLocationSpecialHoursItem[] | null
  tags?: string[]
  timezone?: string | null
  type?: string | null
}

export type Location = {
  address: Address | null
  country_iso_3: string | null
  created_at: string
  custom_fields: CustomFieldsGrouped
  departments?: Department[]
  description: string | null
  email: string
  external_code: string | null
  external_id: string
  handle: string | null
  icon: string | null
  id: number
  image_url: string | null
  is_permanently_closed: boolean
  is_published: boolean
  name: string | null
  normal_hours: LocationNormalHours[]
  phone: string | null
  special_hours: LocationSpecialHours[]
  tags: string[]
  timezone: string | null
  type: string | null
  updated_at: string
}

export type RequestListLocationProfiles = {
  filter?: ListLocationProfilesFilter
  page?: PageSize
}

export type RequestBatchLocationJson = {
  locations: BatchLocationJsonItem[] | null
}

export type LocationResponse = {
  data: Location[]
  meta?: PaginationMeta
  links?: PaginationLink
}
