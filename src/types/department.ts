import { PaginationResponse } from './pagination'

export type Department = {
  id: number
  name: string
  handle: string
  external_id: string | null
  external_code: string | null
  description: string | null
  short_description: string | null
  url: string | null
  image_url: string | null
  internal_note: string | null
  meta: { [key: string]: any } | null
  brand_id: number | null
  location_id: number | null
  brand: {
    name: string
    handle: string
  } | null
  created_at: string
  updated_at: string
}

export type DepartmentResponse = PaginationResponse & {
  data: Department[]
}

export type CreateDepartmentInput = {
  name: string
  handle: string
  brand_id: number
  external_id?: string | null
  external_code?: string | null
  location_id?: number | null
  description?: string | null
  short_description?: string | null
  url?: string | null
  image_url?: string | null
  internal_note?: string | null
  meta?: { [key: string]: any } | null
}

export type UpdateDepartmentInput = Omit<Partial<CreateDepartmentInput>, 'handle' | 'name' | 'brand_id'> & {
  name?: string
  brand_id?: number
}
