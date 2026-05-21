// Route category: identities

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { ProfileWithoutIdentity } from './profiles'

export type RequestQueryIdentity = {
  offset?: number
  limit?: number
  filter?: {
    identifier?: string | FilterOperator
    handle?: string | FilterOperator
    is_primary?: string | FilterOperator
    is_active?: string | FilterOperator
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

export type Identity = {
  created_at: string
  handle: string | null
  id: number
  identifier: string
  is_active: boolean
  is_primary: boolean
  merged_from: string | null
  profile?: ProfileWithoutIdentity
  profile_id: string
  updated_at: string
}

export type IdentityHandlesResponse = Record<string, unknown>

export type IdentityResponse = {
  data: Identity[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type IdentityHandlesResponseResponse = {
  data: IdentityHandlesResponse[]
}
