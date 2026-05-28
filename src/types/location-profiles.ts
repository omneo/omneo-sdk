// Route category: location-profiles

import type { AnyJsonRecord, AnyRecord, LocationHandle, ProfileSummary } from './common'
export type LocationProfileAssignmentTypeEnum = 'staff' | 'manager' | 'profile'

export type UpdateLocationProfileRoleTypeEnum = 'full_time' | 'part_time' | 'casual' | 'other'

export type LocationProfileResource = {
  assignment_type: string
  created_at: string
  deleted_at: string | null
  ends_at: string
  excluded_service_handles: AnyRecord | null
  external_id: string
  id: number
  is_active: boolean
  is_default: boolean
  location: LocationHandle | null
  location_id: number
  meta: AnyRecord | null
  notes: string | null
  profile: ProfileSummary | null
  profile_external_id: string
  profile_id: string
  role_type: string | null
  sort_order: number | null
  starts_at: string
  updated_at: string
}

export type RequestUpdateLocationProfile = {
  assignment_type?: LocationProfileAssignmentTypeEnum
  ends_at?: string | null
  excluded_service_handles?: string[] | null
  external_id?: string | null
  is_active?: boolean
  is_default?: boolean
  meta?: AnyJsonRecord | null
  notes?: string | null
  profile_external_id?: string | null
  role_type?: UpdateLocationProfileRoleTypeEnum | null
  sort_order?: number
  starts_at?: string | null
}
