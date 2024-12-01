import { PaginationResponse } from './pagination'

export type Permission = {
  id: number
  name: string | null
  handle: 'create' | 'read' | 'update' | 'delete'
}

export type PermissionResponse = PaginationResponse & {
  data: Permission[]
}
