import { PaginationResponse } from './pagination'

export type PermissionType = 'create' | 'read' | 'update' | 'delete'

export type Permission = {
  id: number
  name: string | null
  handle: PermissionType
}

export type PermissionResponse = PaginationResponse & {
  data: Permission[]
}
