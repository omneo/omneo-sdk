import { Identity } from './identities'
import { Location } from './location'
import { Redemption } from './redemption'
import { CreateCustomFieldInput, CustomField } from './custom-field'
import { Payment } from './payment'
import { ProductVariant } from './productVariant'
import { PaginationResponse } from './pagination'

export type TransactionFilters = 'profile_id' | 'total' | 'rounding' | 'total_original' | 'margin' | 'external_id' | 'deliver_at' | 'transacted_at' | 'timezone' | 'receipt_is_email' | 'receipt_ref' | 'location_id' | 'systems.handle' | 'type' | 'status' | 'order_number' | 'tags.handle' | 'location.name' | 'profile.identities.identifier' | 'need_action'

export type TransactionItemProductListItem = {
  id: number
  product_list_id: number
  list: {
    name: string
    handle: string
    description: string | null
  } | []
  created_at: string
  updated_at: string
  quantity: number
  position: number | null
  status: string | null
  meta: { [key: string]: any } | null
  pivot: {
    created_at: string
    updated_at: string
  } | []
}

export type TransactionItem = {
  id: number
  external_id: string | null
  name: string
  transaction_id: number
  product_id: number | null
  product?: {
    title: string
    department: string | null
    brand: string | null
    custom_fields?: CustomField[]
  } | null
  product_variant_id: number | null
  product_variant?: ProductVariant | null
  sku: string | null
  variant_external_id: string | null
  is_void: boolean
  is_return: boolean
  quantity: number
  price_current: number
  price_sell: number
  price_original: number | null
  price_margin: number | null
  price_tax: number | null
  discounts: Array<{
    amount: number
    reason_desc: string
  }> | null
  department: string | null
  product_images: Array<{
    url: string
    sort_order: number
  }>
  order_id: number | null
  created_at: string
  updated_at: string
  pivot: {
    created_at: string
    updated_at: string
  } | []
  transaction?: {
    transacted_at: string
    receipt_ref: string | null
    external_id: string | null
  } | null
  meta: {[key: string]: any} | null
  list_items?: TransactionItemProductListItem[] | null
}

export type TransactionItemResponse = PaginationResponse & {
  data: TransactionItem
}

export type CreateTransactionItemInput = {
  name: string
  product_variant_id: number
  quantity: number
  is_void?: boolean | null
  price_current: number
  price_sell: number
  price_original?: number | null
  price_margin?: number | null
  tags?: string[]
}

export type Transaction = {
  id: number
  external_id: string | null
  redemption: Redemption | null
  reversed_redemptions: Redemption[]
  profile_id?: string | null
  profile?: {
    email: string
  } | null
  location?: Location
  meta: {[key: string]: any} | null
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
  payments: Array<Payment> | null
  receipt_is_email: boolean
  receipt_ref: string | null
  linked_receipt_ref: string | null
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
  organisation: any | null
  fees: any | null
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
  price_tax?: number;
  price_original?: number;
  product_variant_id?: number;
  product_variant?: TransactionLineItemProductVariantInput;
  discounts?: TransactionLineItemDiscount[];
}

export type CreateTransactionCurrencyValue = {
  from?: string
  to?: string
  rate?: number
}

export type CreateTransactionItem = Omit<
  TransactionLineItemInput,
  'price_original' | 'discounts' | 'product_variant_id' | 'product_variant'
> & {
  external_id?: string | null
  price_original?: number | null
  price_margin?: number | null
  discounts?: TransactionLineItemDiscount[] | null
  sku?: string | null
  department?: string | null
  meta?: { [key: string]: any } | null
  variant_external_id?: string | null
  product_variant_sku?: string | null
  product_variant_id?: number | null
  product_variant?: TransactionLineItemProductVariantInput | null
}

export type CreateTransactionInput = {
  profile_id?: string | null
  profile_id_handle?: string | null
  redemption_id?: number | null
  external_id?: string | null
  location_id?: string | number | null
  currency?: string | null
  currency_value?: CreateTransactionCurrencyValue
  total: number
  total_original?: number | null
  rounding?: number | null
  tender?: string | null
  is_void?: boolean | null
  margin?: number | null
  transacted_at: string
  timezone: string
  meta?: { [key: string]: any } | null
  items: CreateTransactionItem[]
  tags?: string[]
  systems?: string[]
  staff_id?: string | number | null
  payments?: unknown[]
  receipt_is_email?: boolean | null
  receipt_ref?: string | null
  linked_receipt_ref?: string | null
  receipt_email?: string | null
  type?: string | null
  status?: string | null
  order_number?: string | null
  order_id?: number | null
  external_order_id?: string | null
  need_action?: boolean | null
  custom_fields?: Pick<CreateCustomFieldInput, 'namespace' | 'handle' | 'type' | 'value'>[]
  organisation_id?: number | null
  fees?: unknown[] | null
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>

export type TriggerTransactionEventInput = {
  event: 'transaction.sync' | 'transaction.recalculate'
}

export type MockTransactionItem = {
  name: string
  sku?: string | null
  product_variant_sku?: string | null
  price_current?: number
  price_sell: number
  quantity: number
}

export type MockTransactionInput = {
  trigger_id: number
  profile_id: string | null
  profile_id_handle?: string | null
  location_id?: string | number | null
  total: number
  transacted_at: string
  timezone: string
  items: MockTransactionItem[]
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

export type TransactionUnassignedItemsResponse = PaginationResponse & {
  data: TransactionItem[]
}

export type TransactionAssignedItemsResponse = PaginationResponse & {
  data: TransactionItem[]
}

export type TransactionClaim = {
  id: number
  status: string
  profile_id: string
  transaction_receipt_ref: number | string
  transaction_transacted_at: string
  transaction_timezone: string
  transaction_total: number
  transaction_location_external_code: string
  attempts: number | null
  claimed_transaction_id: number | null
  claimed_at: string | null
  last_checked_at: string | null
  created_at: string
  updated_at: string
}

export type TransactionClaimsResponse = PaginationResponse & {
  data: TransactionClaim[]
}

export type ClaimTransactionInput = {
  profile_id: string
  transaction_receipt_ref: number | string
  transaction_transacted_at: string
  transaction_timezone?: string
  transaction_total: number
  transaction_location_external_code?: string
}

export type LinkTransactionItemListItemInput = {
  product_list_item_id: number
  type: 'link'
}
