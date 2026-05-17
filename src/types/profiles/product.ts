import type { AnyJsonRecord } from '../common'
import type { PaginationLink, PaginationMeta } from '../pagination'
import type { CustomFieldItem } from '../custom-fields'
import type { ProductListItem, ProductListReservationNested } from '../list'
export type RequestCreateCustomProductListItem = {
  barcode?: string | null
  currency?: string | null
  description?: string | null
  image_url?: string | null
  name: string
  position?: number | null
  price?: number | null
  product_id?: number
  quantity?: number
  sku?: string | null
  url?: string | null
}

export type CreateProductListItemsItem = {
  custom_field: string
  external_id: string
  meta?: AnyJsonRecord | null
  position?: number | null
  product_category_id: number
  product_id: number
  product_variant_barcode: string
  product_variant_id: number
  product_variant_sku: string
  quantity?: number | null
  status?: string | null
}

export type RequestCreateProductListItem = {
  custom_field: string
  external_id: string
  location_id?: number | null
  meta?: AnyJsonRecord | null
  position?: number | null
  product_category_id?: number
  product_id: number
  product_variant_barcode: string
  product_variant_id: number
  product_variant_sku: string
  quantity?: number
  source?: string | null
  status?: string
}

export type UpdateProductListItemsItem = {
  id?: number
  meta?: AnyJsonRecord | null
  position?: number | null
  quantity?: number | null
  status?: string | null
}

export type RequestUpdateProductListItem = {
  location_id?: number | null
  meta?: AnyJsonRecord | null
  position?: number | null
  product_category_id?: number
  product_id?: number
  product_variant_barcode?: string
  product_variant_id?: number
  product_variant_sku?: string
  quantity?: number
  source?: string | null
  status?: string
}

export type ProductListItemResponse = {
  data: ProductListItem[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type ProductListReservationsGetReservationByProfileResponse = {
  data: ProductListReservationNested[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type RequestCreateProductList = {
  custom_date?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  handle?: string
  items?: CreateProductListItemsItem[] | null
  list_definition_id?: number
  location_id?: number | null
  meta?: AnyJsonRecord | null
  name: string
  organisation_id?: number | null
  sort_order?: number
  staff_id?: string | null
  tags?: string[]
}

export type RequestUpdateProductList = {
  custom_date?: string | null
  custom_fields?: CustomFieldItem[]
  description?: string | null
  items?: UpdateProductListItemsItem[] | null
  location_id?: number | null
  meta?: AnyJsonRecord | null
  name?: string
  organisation_id?: number | null
  profile_id?: string
  sort_order?: number
  staff_id?: string | null
  tags?: string[]
  update_items_only?: boolean
}
