import { PaginationResponse } from './pagination'
import { Profile } from './profile'

export type Staff = Profile

export type StaffGender = 'male' | 'female' | 'withheld' | 'other'

export type CreateStaffInput = {
  title?: string | null
  first_name: string
  last_name: string
  email: string
  gender?: StaffGender | null
  mobile_phone?: string | null
  secondary_phone?: string | null
  birth_day?: number | null
  birth_month?: number | null
  birth_year?: number | null
  company?: string | null
  occupation?: string | null
  staff_id: string
  joined_at: string
}

export type UpdateStaffInput = Omit<Partial<CreateStaffInput>, 'joined_at'>

export type StaffResponse = PaginationResponse & {
  data: Staff[]
}
