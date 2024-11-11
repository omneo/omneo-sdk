import { Identity } from './identities'
import { Location } from './location'

export type TransactionFilters = 'profile_id' | 'total' | 'rounding' | 'total_original' | 'margin' | 'external_id' | 'deliver_at' | 'transacted_at' | 'timezone' | 'receipt_is_email' | 'receipt_ref' | 'location_id' | 'systems.handle' | 'type' | 'status' | 'order_number' | 'tags.handle' | 'location.name' | 'profile.identities.identifier' | 'need_action'
export type TransactionItem = {
  id: number
  external_id: string | null
  name: string
  transaction_id: number
  product_id: number
  product_variant_id: number | null
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
  }>
  department: string | null
  product_images: Array<any>
  created_at: Date
  updated_at: Date
  transaction: {
    transacted_at: Date
    receipt_ref: string | null
    external_id: string | null
  }
}

export type Transaction = {
  id: string
  external_id: string
  profile_id?: string
  profile?: {
    email: string
  }
  location?: Location
  meta: {[key: string]: any}
  total: number
  total_original: number | null
  systems: Array<any>
  rounding: number | null
  margin: number | null
  is_void: boolean
  transacted_at: Date
  timezone: string
  tags: Array<string>
  items: Array<TransactionItem>
  payments: Array<string>
  receipt_is_email: boolean
  receipt_ref: string | null
  claimed_at: Date | null
  receipt_email: string | null
  staff: {
    id: string
    full_name: string
    email: string
    identities: Array<Identity>
  } | null
  currency_id: string | null
  currency_rate: number | null
  currency: string | null
  created_at: Date
  updated_at: Date
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
