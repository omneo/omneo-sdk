// Route category: customProducts

import type { FilterOperator } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type RequestCreateCustomProduct = {
  barcode?: string | null
  currency?: string | null
  description?: string | null
  image_url?: string | null
  name: string
  price?: number | null
  product_id?: number
  sku?: string | null
  url?: string | null
}

export type RequestUpdateCustomProduct = {
  barcode?: string | null
  currency?: string | null
  description?: string | null
  image_url?: string | null
  name?: string
  price?: number | null
  product_id?: number
  sku?: string | null
  url?: string | null
}

export type RequestQueryCustomProduct = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    description?: string | FilterOperator
    barcode?: string | FilterOperator
    sku?: string | FilterOperator
    url?: string | FilterOperator
    price?: string | FilterOperator
    currency?: string | FilterOperator
    image_url?: string | FilterOperator
    product_id?: string | FilterOperator
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

export type CustomProduct = {
  barcode: string | null
  created_at: string
  currency: string | null
  description: string | null
  id: number
  image_url: string | null
  name: string | null
  price: number | null
  product_id: number
  sku: string | null
  updated_at: string
  url: string | null
}

export type CustomProductResponse = {
  data: CustomProduct[]
  meta?: PaginationMeta
  links?: PaginationLink
}
