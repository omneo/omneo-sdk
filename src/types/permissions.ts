// Route category: permissions


import type { PaginationLink, PaginationMeta } from './pagination'

export type Permission = {
  handle: 'create' | 'read' | 'update' | 'delete' | null
  id: number
  name: string | null
}

export type PermissionResponse = {
  data: Permission[]
  meta?: PaginationMeta
  links?: PaginationLink
}
