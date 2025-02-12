import { PaginationResponse } from './pagination'

export type ProductVariant = {
    id: number
    product_id: number
    sku: string
    external_id: number | null
    barcode: string | null
    web_url: string | null
    handle: string | null
    title: string
    description: string | null
    position: number
    price: number
    price_discounted: number | null
    price_comparison: number | null
    price_cost: number | null
    available_quantity: number | null
    images: Array<any>
    meta: { [key: string]: any } | null
    tags: Array<string>
    options: Array<any>
    created_at: string
    updated_at: string
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
