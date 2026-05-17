import type { PageSize } from '../common'

export type ListProfileLocationsFilterAssignmentTypeEnum = 'staff' | 'manager' | 'profile'

export type ListProfileLocationsFilter = {
  assignment_type?: ListProfileLocationsFilterAssignmentTypeEnum
  is_active?: boolean
  is_default?: boolean
}

export type RequestListProfileLocations = {
  filter?: ListProfileLocationsFilter
  page?: PageSize
}

