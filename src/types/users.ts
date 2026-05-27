// Route category: users

import type { FilterOperator, UserHandle } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type UserRolesItem = {
  id: number
}

export type RequestQueryUser = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    name?: string | FilterOperator
    email?: string | FilterOperator
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
  [key: string]: any
}

export type User = {
  created_at: string
  email: string
  id: number
  name: string | null
  permissions: UserHandle[]
  roles: UserHandle[]
  throttle: number | null
  updated_at: string
}

export type RequestCreateUser = {
  email: string
  name: string
  password: string
  password_confirmation: string
  roles?: UserRolesItem[]
  throttle?: number | null
}

export type RequestUpdateUser = {
  email?: string
  name?: string
  old_password?: string
  password?: string
  roles?: UserRolesItem[]
  throttle?: number | null
}

export type UserResponse = {
  data: User[]
  meta?: PaginationMeta
  links?: PaginationLink
}
