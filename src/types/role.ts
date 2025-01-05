import { PaginationResponse } from './pagination'

export type RolePermission = {
  id: number
  name: string | null
  handle: 'create' | 'read' | 'update' | 'delete'
}

export type Role = {
  id: number
  name: string
  handle: string
  weight: number
  permissions: RolePermission[]
}

export type RoleResponse = PaginationResponse & {
  data: Role[]
}
