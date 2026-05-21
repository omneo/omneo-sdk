// Route category: products

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { CustomField, CustomFieldItem } from './custom-fields'
import type { Organisation } from './organisations'

export type ProductStatusEnum = 'new' | 'active' | 'rundown' | 'discontinued' | 'ranged' | 'deleted' | 'archived' | 'draft'

export type ProductVariantsItemOptionsItem = {
  name: string
  sort_order?: number | null
  value: string
}

export type ProductVariantOptionsItem = {
  name?: string | null
  sort_order?: number | null
  value: string
}

export type RequestQueryProduct = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    title?: string | FilterOperator
    type?: string | FilterOperator
    handle?: string | FilterOperator
    external_id?: string | FilterOperator
    status?: string | FilterOperator
    brand?: string | FilterOperator
    description?: string | FilterOperator
    currency?: string | FilterOperator
    position?: string | FilterOperator
    tags?: {
      handle?: string | FilterOperator
    }
    department?: string | FilterOperator
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

export type RequestQueryProductVariant = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    external_id?: string | FilterOperator
    handle?: string | FilterOperator
    web_url?: string | FilterOperator
    barcode?: string | FilterOperator
    sku?: string | FilterOperator
    title?: string | FilterOperator
    available_quantity?: string | FilterOperator
    description?: string | FilterOperator
    price?: string | FilterOperator
    price_discounted?: string | FilterOperator
    price_comparison?: string | FilterOperator
    price_cost?: string | FilterOperator
    position?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
}

export type ProductImageItem = {
  url: string
  sort_order?: number | null
}

export type ProductOption = {
  name: string | null
  sort_order: number | null
  value: string
}

export type ProductQueueResponse = {
  data: string
}

export type ProductBatchJsonResponse = {
  message: string
}

export type StoreOrUpdateProductVariantsItem = {
  available_quantity?: number | null
  barcode?: string | null
  description?: string | null
  external_id?: string | null
  images?: ProductImageItem[] | null
  options?: ProductVariantOptionsItem[] | null
  position: number
  price: number
  price_comparison?: number | null
  price_cost?: number | null
  price_discounted?: number | null
  sku: string
  tags?: string[]
  title?: string | null
}

export type StoreOrUpdateProductQueueVariantsItem = {
  available_quantity?: number | null
  barcode?: string | null
  description?: string | null
  external_id?: string | null
  images?: ProductImageItem[] | null
  options?: ProductVariantOptionsItem[] | null
  position?: number | null
  price?: number
  price_comparison?: number | null
  price_cost?: number | null
  price_discounted?: number | null
  sku: string
  tags?: string[]
  title?: string | null
}

export type CreateProductVariantsItem = {
  available_quantity?: number | null
  description?: string | null
  images?: ProductImageItem[] | null
  meta?: AnyJsonRecord | null
  options?: ProductVariantsItemOptionsItem[] | null
  position?: number | null
  price: number
  price_comparison?: number | null
  price_cost?: number | null
  price_discounted?: number | null
  sku: string
  tags?: string[]
  title?: string | null
}

export type RequestCreateProductVariant = {
  available_quantity?: number | null
  barcode?: string | null
  description?: string | null
  external_id?: string | null
  handle?: string | null
  images?: ProductImageItem[] | null
  meta?: AnyRecord | null
  options?: ProductVariantOptionsItem[] | null
  position?: number | null
  price: number
  price_comparison?: number | null
  price_cost?: number | null
  price_discounted?: number | null
  sku: string
  tags?: string[]
  title: string
  web_url?: string | null
}

export type UpdateProductVariantsItem = {
  available_quantity?: number | null
  description?: string | null
  id?: number | null
  images?: ProductImageItem[] | null
  meta?: AnyJsonRecord | null
  options?: ProductVariantsItemOptionsItem[] | null
  position?: number
  price?: number
  price_comparison?: number | null
  price_cost?: number | null
  price_discounted?: number | null
  sku?: string | null
  tags?: string[]
  title?: string | null
}

export type RequestUpdateProductVariant = {
  available_quantity?: number | null
  barcode?: string | null
  description?: string | null
  external_id?: string | null
  handle?: string | null
  images?: ProductImageItem[] | null
  meta?: AnyRecord | null
  options?: ProductVariantOptionsItem[] | null
  position?: number | null
  price?: number
  price_comparison?: number | null
  price_cost?: number | null
  price_discounted?: number | null
  sku?: string
  tags?: string[]
  title?: string | null
  web_url?: string | null
}

export type ProductVariant = {
  available_quantity: number | null
  barcode: string | null
  created_at: string
  description: string | null
  external_id: string
  handle: string | null
  id: number
  images: ProductImageItem[] | null
  meta: AnyRecord | null
  options: ProductOption[]
  position: number
  price: number | null
  price_comparison: number | null
  price_cost: number | null
  price_discounted: number | null
  product_id: number
  sku: string
  tags: string[]
  title: string | null
  updated_at: string
  web_url: string | null
}

export type RequestCreateOrUpdateProduct = {
  brand: string
  channels?: string[]
  currency?: string | null
  description?: string | null
  external_id: string
  handle: string
  images?: ProductImageItem[] | null
  position?: number
  status?: ProductStatusEnum
  systems?: string[]
  tags?: string[]
  title: string
  type?: 'appointment' | 'simple' | 'configurable' | 'downloadable' | 'gift' | 'bundle' | 'voucher' | 'service' | 'subscription' | null
  variants: StoreOrUpdateProductVariantsItem[] | null
  web_url?: string | null
}

export type RequestCreateOrUpdateProductQueue = {
  archive_existing_variants?: boolean | null
  brand?: string
  channels?: string[]
  currency?: string | null
  custom_fields?: CustomFieldItem[] | null
  department?: string | null
  description?: string | null
  external_id: string
  handle?: string
  images?: ProductImageItem[] | null
  meta?: AnyJsonRecord | null
  position?: number
  status?: ProductStatusEnum
  systems?: string[]
  tags?: string[]
  title?: string
  type?: 'appointment' | 'simple' | 'configurable' | 'downloadable' | 'gift' | 'bundle' | 'voucher' | 'service' | 'subscription' | null
  variants?: StoreOrUpdateProductQueueVariantsItem[] | null
  web_url?: string | null
}

export type RequestCreateProduct = {
  brand: string
  channels?: string[]
  currency?: string | null
  custom_fields?: CustomFieldItem[] | null
  department?: string | null
  description?: string | null
  external_id?: string | null
  handle: string
  images?: ProductImageItem[] | null
  meta?: AnyJsonRecord | null
  organisation_id?: number | null
  position?: number
  status?: ProductStatusEnum
  systems?: string[]
  tags?: string[]
  title: string
  type?: 'appointment' | 'simple' | 'configurable' | 'downloadable' | 'gift' | 'bundle' | 'voucher' | 'service' | 'subscription' | null
  variants?: CreateProductVariantsItem[] | null
  web_url?: string | null
}

export type BatchProductJsonItem = {
  archive_existing_variants?: boolean | null
  brand?: string
  channels?: string[]
  currency?: string | null
  custom_fields?: CustomFieldItem[] | null
  department?: string | null
  description?: string | null
  external_id?: string | null
  handle: string
  images?: ProductImageItem[] | null
  meta?: AnyJsonRecord | null
  position?: number
  status?: ProductStatusEnum
  systems?: string[]
  tags?: string[]
  title?: string
  type?: 'appointment' | 'simple' | 'configurable' | 'downloadable' | 'gift' | 'bundle' | 'voucher' | 'service' | 'subscription' | null
  variants?: UpdateProductVariantsItem[] | null
  web_url?: string | null
}

export type RequestUpdateProduct = {
  archive_existing_variants?: boolean | null
  brand?: string
  channels?: string[]
  currency?: string | null
  custom_fields?: CustomFieldItem[] | null
  department?: string | null
  description?: string | null
  external_id?: string | null
  images?: ProductImageItem[] | null
  meta?: AnyJsonRecord | null
  organisation_id?: number | null
  position?: number
  status?: ProductStatusEnum
  systems?: string[]
  tags?: string[]
  title?: string
  type?: 'appointment' | 'simple' | 'configurable' | 'downloadable' | 'gift' | 'bundle' | 'voucher' | 'service' | 'subscription' | null
  variants?: UpdateProductVariantsItem[] | null
  web_url?: string | null
}

export type ProductVariantResponse = {
  data: ProductVariant[]
}

export type Product = {
  brand: string | null
  channels: string[]
  created_at: string
  currency: string | null
  custom_fields: CustomField[]
  department: string | null
  description: string | null
  external_id: string
  handle: string | null
  id: number
  images: ProductImageItem[] | null
  link_brand: string | null
  link_department: string | null
  meta: AnyRecord | null
  options: Record<string, string[]>
  organisation: Organisation | null
  position: number
  status: ProductStatusEnum
  systems: string[]
  tags: string[]
  title: string | null
  type: string | null
  updated_at: string
  variants: ProductVariant[]
  web_url: string | null
}

export type RequestBatchProductJson = {
  products: BatchProductJsonItem[] | null
}

export type ProductResponse = {
  data: Product[]
  meta?: PaginationMeta
  links?: PaginationLink
}
