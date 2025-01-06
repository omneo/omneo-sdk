import { PaginationResponse } from './pagination'
import { PermissionType } from './permissions'

export type UserRole = {
  id: number
  handle: string
}

export type UserPermission = {
  id: number
  handle: PermissionType
}

export type User = {
  id: number
  name: string
  email: string
  throttle: number | null
  roles: UserRole[]
  permissions: UserPermission[]
  created_at: string
  updated_at: string
}

export type UserResponse = PaginationResponse & {
  data: User[]
}

export type UserCreateInput = {
  name: User['name']
  email: User['email']
  password: string
  password_confirmation: string
  throttle?: User['throttle']
  roles?: Omit<UserRole, 'handle'>[]
}

export type UserUpdateInput = Partial<UserCreateInput>
