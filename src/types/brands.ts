import { PaginationResponse } from './pagination'

export type Brand = {
  id: number
  name: string
  handle: string
  external_id: string | null
  external_code: string | null
  is_system: boolean
  description: string | null
  short_description: string | null
  url: string | null
  image_url: string | null
  internal_note: string | null
  meta: any | null
  departments: any[]
  created_at: string
  updated_at: string
}

export type BrandInput = Partial<Omit<Brand, 'id' | 'created_at' | 'updated_at'>> & {
  handle: Brand['handle']
}

export type BrandResponse = PaginationResponse & {
  data: Brand[]
}
