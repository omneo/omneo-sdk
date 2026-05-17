

export type CreateProfileRegionsItem = {
  country?: string | null
  handle: string
  is_active?: boolean | null
  region_id: number
  state?: string | null
}

export type RequestCreateProfileRegion = {
  country?: string | null
  is_active?: boolean | null
  region_id: number
  state?: string | null
}

export type UpdateProfileRegionsItem = {
  country?: string | null
  handle: string
  id: number
  is_active?: boolean | null
  state?: string | null
}

export type RequestUpdateProfileRegion = {
  country?: string | null
  is_active?: boolean | null
  state?: string | null
}

export type ProfileRegion = {
  country: string | null
  created_at: string
  handle: string | null
  id: number
  is_active: boolean
  name: string | null
  state: string | null
  updated_at: string
}

export type ProfileRegionResponse = {
  data: ProfileRegion[]
}
