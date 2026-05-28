// Route category: staff

import type { Profile } from './profiles'

export type StaffGenderEnum = 'male' | 'female' | 'withheld' | 'other'

export type Staff = Profile

export type RequestCreateStaff = {
  birth_day?: number | null
  birth_month?: number | null
  birth_year?: number | null
  company?: string | null
  email: string
  first_name: string
  gender?: StaffGenderEnum | null
  joined_at: string
  last_name: string
  mobile_phone?: string | null
  occupation?: string | null
  secondary_phone?: string | null
  staff_id: string
  title?: string | null
}

export type RequestUpdateStaff = {
  birth_day?: number | null
  birth_month?: number | null
  birth_year?: number | null
  company?: string | null
  email?: string
  first_name?: string
  gender?: StaffGenderEnum | null
  last_name?: string
  mobile_phone?: string | null
  occupation?: string | null
  secondary_phone?: string | null
  staff_id?: string
  title?: string | null
}
export type StaffResponse = {
  data: Staff[]
}
