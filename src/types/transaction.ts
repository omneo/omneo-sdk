import { Identity } from './identities'
import { Location } from './location'
import { Redemption } from './redemption'
import { Payment } from './payment'
import { ProductVariant } from './productVariant'
import { PaginationResponse } from './pagination'

export type TransactionFilters = 'profile_id' | 'total' | 'rounding' | 'total_original' | 'margin' | 'external_id' | 'deliver_at' | 'transacted_at' | 'timezone' | 'receipt_is_email' | 'receipt_ref' | 'location_id' | 'systems.handle' | 'type' | 'status' | 'order_number' | 'tags.handle' | 'location.name' | 'profile.identities.identifier' | 'need_action'
export type TransactionItem = {
  id: number
  external_id: string | null
  name: string
  transaction_id: number
  product_id: number
  product: {
    title: string
    department: string | null
    brand: string | null
  }
  product_variant_id: number | null
  product_variant: ProductVariant
  sku: string | null
  variant_external_id: string | null
  is_void: boolean
  quantity: number
  price_current: number
  price_sell: number
  price_original: number
  price_margin: number | null
  price_tax: number | null
  discounts: Array<{
    amount: number
    reason_desc: string
  }> | null
  department: string | null
  product_images: Array<any>
  order_id: number | null
  created_at: string
  updated_at: string
  pivot: any[]
  transaction: {
    transacted_at: string
    receipt_ref: string | null
    external_id: string | null
  }
  meta: {[key: string]: any}
}

export type Transaction = {
  id: number
  external_id: string
  profile_id?: string
  profile?: {
    email: string
  }
  redemption: Redemption | null
  location?: Location
  meta: {[key: string]: any}
  total: number
  total_original: number | null
  total_converted: number | null
  systems: Array<string>
  rounding: number | null
  margin: number | null
  is_void: boolean
  transacted_at: string
  timezone: string
  tags: Array<string>
  items: Array<TransactionItem>
  payments: Array<Payment>
  receipt_is_email: boolean
  receipt_ref: string | null
  claimed_at: string | null
  receipt_email: string | null
  staff: {
    id: string
    full_name: string
    email: string
    identities: Array<Identity>
  } | null
  currency_id: number | null
  currency_rate: number | null
  currency: string | null
  currency_values: any[]
  type: string | null
  status: string | null
  order_number: string | null
  order_id: string | null
  external_order_id: string | null
  need_action: boolean | null
  custom_fields: { [key: string]: any }
  created_at: string
  updated_at: string
}

export type TransactionLineItemProductVariantInput = {
  product_id: number;
  sku: string;
  barcode?: string;
  title: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
}

export interface TransactionLineItemDiscount {
  amount: number;
  reason_desc: string;
}

export interface TransactionLineItemInput {
  name: string;
  quantity: number;
  price_current: number;
  price_sell: number;
  price_tax: number;
  price_original: number;
  product_variant_id?: number;
  product_variant?: TransactionLineItemProductVariantInput;
  discounts?: TransactionLineItemDiscount[];
}

export type TransactionInput = {
  profile_id: string;
  external_id: string;
  receipt_ref: string;
  location_id: string;
  total: number;
  total_original: number;
  systems?: string[];
  timezone: string;
  tags: string[];
  items: TransactionLineItemInput[];
  payments?: any[];
  transacted_at: string;
  created_at?: string;
  updated_at?: string;
  meta?: { [key: string ] : any };
  delete_existing_items?: boolean;
  receipt_is_email?: boolean;
  is_void?: boolean;
}

export type GroupedTransaction = {
  order_number: string | null
  transaction_id: number
  number_transactions: number
  latest_updated_at: string
  latest_transacted_at: string
}

export type GroupedTransactionsResponse = {
  current_page: number
  data: GroupedTransaction[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string | null
    active: boolean
  }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type TransactionLedger = {
  id: number
  profile: {
    id: string
    email: string
  }
  type: 'transaction'
  type_attributes: Transaction
}

export type TransactionResponse = PaginationResponse & {
  data: Transaction[]
}
