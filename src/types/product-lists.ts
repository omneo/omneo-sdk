// Route category: product-lists

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { ProductList } from './lists'

export type RequestQueryProductList = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    name?: string | FilterOperator
    handle?: string | FilterOperator
    sort_order?: string | FilterOperator
    meta?: string | FilterOperator
    description?: string | FilterOperator
    custom_date?: string | FilterOperator
    location_id?: string | FilterOperator
    staff_id?: string | FilterOperator
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

export type ProductListResponse = {
  data: ProductList[]
  meta?: PaginationMeta
  links?: PaginationLink
}
