import type { AnyJsonRecord, FilterOperator, ImageSortItem } from '../common'
import type { PaginationLink, PaginationMeta } from '../pagination'
import type { ProductOption } from '../products'

export type RequestClaimTransaction = {
  profile_id: string
  transaction_location_external_code?: string | null
  transaction_receipt_ref: string | null
  transaction_timezone?: string
  transaction_total: number
  transaction_transacted_at?: string
}

export type RequestQueryTransactionClaim = {
  offset?: number
  limit?: number
  filter?: {
    transaction_transacted_at?: string | FilterOperator
    transaction_receipt_ref?: string | FilterOperator
    transaction_timezone?: string | FilterOperator
    transaction_total?: string | FilterOperator
    transaction_location_external_code?: string | FilterOperator
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

export type TransactionClaim = {
  attempts: number | null
  claimed_at: string | null
  claimed_transaction_id: number
  created_at: string
  id: number
  last_checked_at: string | null
  profile_id: string
  status: string
  transaction_location_external_code: string | null
  transaction_receipt_ref: string | null
  transaction_timezone: string | null
  transaction_total: number | null
  transaction_transacted_at: string | null
  updated_at: string
}

export type TransactionProductVariantProduct = { refund_qty: number; purchase_qty: number }

export type GroupedTransaction = {
  order_number: string | null
  transaction_id: number
  number_transactions: number
  latest_updated_at: string
  latest_transacted_at: string
}

export type ProfileTransactionClaimResponse = {
  data: TransactionClaim[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type TransactionProductVariant = {
  available_quantity: number | null
  barcode: string | null
  count: number
  created_at: string
  description: string | null
  external_id: string
  handle: string | null
  id: number
  images: ImageSortItem[]
  latest_transacted_at: string | null
  location_types: string | null
  meta: AnyJsonRecord | null
  options: ProductOption[]
  position: number
  price: number | null
  price_comparison: number | null
  price_cost: number | null
  price_discounted: number | null
  product: TransactionProductVariantProduct
  product_id: number
  purchase_qty: number
  refund_qty: number
  sku: string
  tags: string[]
  title: string | null
  updated_at: string
  web_url: string | null
}

export type ProfileTransactionIndexGroupResponse = {
  current_page: number
  data: GroupedTransaction[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: Array<{ url: string | null; label: string; active: boolean }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

export type TransactionProductVariantResponse = {
  data: TransactionProductVariant[]
  meta?: PaginationMeta
  links?: PaginationLink
}
