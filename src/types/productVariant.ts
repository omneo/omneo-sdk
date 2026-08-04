import { PaginationResponse } from './pagination'
import { Tag } from './tags'

export type ProductVariantImage = {
  url: string
  sort_order?: number | null
}

export type ProductVariantOption = {
  id: number
  name: string | null
  value: string
  sort_order: number | null
}

export type ProductVariantOptionInput = {
  value: ProductVariantOption['value']
} & Partial<Pick<ProductVariantOption, 'name' | 'sort_order'>>

export type ProductVariant = {
    id: number
    product_id: number
    sku: string
    external_id: string | null
    barcode: string | null
    web_url: string | null
    handle: string | null
    title: string
    description: string | null
    position: number | null
    price: number
    price_discounted: number | null
    price_comparison: number | null
    price_cost: number | null
    available_quantity: number | null
    images: ProductVariantImage[]
    meta: { [key: string]: any } | null
    tags: Tag[]
    options: ProductVariantOption[]
    created_at: string
    updated_at: string
}

export type CreateProductVariantInput = {
  title: string
  handle?: string | null
  external_id?: string | null
  web_url?: string | null
  sku: string
  barcode?: string | null
  description?: string | null
  available_quantity?: number | null
  price: number
  price_discounted?: number | null
  price_comparison?: number | null
  price_cost?: number | null
  position?: number | null
  tags?: string[]
  images?: ProductVariantImage[]
  options?: ProductVariantOptionInput[]
  meta?: { [key: string]: any } | null
}

export type UpdateProductVariantInput = Omit<Partial<CreateProductVariantInput>, 'title'> & {
  title?: string | null
}

export type TransactionProductVariant = {
  id: number
  countt: number
  refund_qty: number
  purchase_qty: number
  latest_transacted_at: string
  product_id: number
  product: {
    refund_qty: number
    purchase_qty: number
  }
  location_types: string
  sku: string
  external_id: string
  barcode: string
  web_url: string
  handle: string
  title: string
  description: string
  position: number
  price: number
  price_discounted: number
  price_comparison: number
  price_cost: number
  available_quantity: number
  images: {
    url: string
    sort_order: number
  }[]
  meta: any
  tags: string[]
  created_at: string
  updated_at: string
}

export type TransactionProductVariantsResponse = PaginationResponse & {
  data: TransactionProductVariant[]
}
export type ProductVariantsResponse = PaginationResponse & {
  data: ProductVariant[]
}
