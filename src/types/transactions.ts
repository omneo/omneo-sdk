// Route category: transactions

import type { AnyJsonRecord, AnyRecord, CurrencyRate, DiscountRecord, EmailRecord, FilterOperator, ImageSortItem, ProductVariantRecord, QuantityRecord, Timestamps } from './common'
import type { PaginationLink, PaginationMeta } from './pagination'
import type { CustomField, CustomFieldItem } from './custom-fields'
import type { Location } from './locations'
import type { Organisation } from './organisations'
import type { ProductVariant } from './products'
import type { Redemption, RedemptionItem } from './redemptions'
import type { Address } from './address'
import type { Identity } from './identities'

export type TierPointBasic = {
  accrued_at: string
  created_at: string
  id: number
  issued_at: string
  meta: AnyJsonRecord | null
  point_definition_id: number
  profile_id: string
  source_id: number
  source_type: string | null
  status: 'pending' | 'active' | null
  updated_at: string
  value: number
}

export type BatchTransactionJsonItemItemsItem = {
  department?: string | null
  discounts?: string[] | null
  external_id?: string | null
  meta?: AnyJsonRecord | null
  name: string
  price_current: number
  price_margin?: number | null
  price_original?: number | null
  price_sell: number
  product_variant?: ProductVariantRecord | null
  product_variant_id?: number | null
  product_variant_sku?: string | null
  sku?: string
  variant_external_id?: string | null
}

export type LinkTransactionItemListItemTypeEnum = 'link' | 'unlink'

export type MockTransactionItemsItem = {
  name: string
  price_current?: number
  price_sell: number
  product_variant_sku?: string | null
  quantity: number
  sku?: string | null
}

export type TransactionItemsItem = {
  department?: string | null
  discounts?: DiscountRecord | DiscountRecord[] | null
  external_id?: string | null
  meta?: AnyJsonRecord | null
  name: string
  price_current: number
  price_margin?: number | null
  price_original?: number | null
  price_sell: number
  product_variant?: ProductVariantRecord | null
  product_variant_id?: number | null
  product_variant_sku?: string | null
  quantity: number
  sku?: string
  variant_external_id?: string | null
}

export type RequestCreateTransactionItem = {
  is_void?: boolean | null
  name: string
  price_current: number
  price_margin?: number | null
  price_original?: number | null
  price_sell: number
  product_variant_id: number
  quantity: number
  tags?: string[]
}

export type TriggerTransactionEventEventEnum = 'transaction.sync' | 'transaction.recalculate'

export type UpdateCreateTransactionItemsItem = {
  discounts?: string[] | null
  external_id?: string | null
  id?: string | null
  name?: string
  price_current?: number
  price_margin?: number | null
  price_original?: number | null
  price_sell?: number
  product_variant?: ProductVariantRecord | null
  product_variant_id?: number | null
  product_variant_sku?: string | null
  quantity?: number
  sku?: string
  variant_external_id?: string | null
}

export type RequestQueryTransaction = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    total?: string | FilterOperator
    rounding?: string | FilterOperator
    total_original?: string | FilterOperator
    margin?: string | FilterOperator
    external_id?: string | FilterOperator
    redemption_id?: string | FilterOperator
    deliver_at?: string | FilterOperator
    transacted_at?: string | FilterOperator
    timezone?: string | FilterOperator
    receipt_is_email?: string | FilterOperator
    receipt_ref?: string | FilterOperator
    linked_receipt_ref?: string | FilterOperator
    location_id?: string | FilterOperator
    systems?: {
      handle?: string | FilterOperator
    }
    type?: string | FilterOperator
    status?: string | FilterOperator
    order_number?: string | FilterOperator
    tags?: {
      handle?: string | FilterOperator
    }
    location?: {
      name?: string | FilterOperator
    }
    profile?: {
      identities?: {
        identifier?: string | FilterOperator
      }
    }
    need_action?: string | FilterOperator
    is_void?: string | FilterOperator
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

export type RequestQueryTransactionItem = {
  offset?: number
  limit?: number
  filter?: {
    sku?: string | FilterOperator
    variant_external_id?: string | FilterOperator
    external_id?: string | FilterOperator
    name?: string | FilterOperator
    quantity?: string | FilterOperator
    price_current?: string | FilterOperator
    price_sell?: string | FilterOperator
    price_original?: string | FilterOperator
    price_margin?: string | FilterOperator
    price_tax?: string | FilterOperator
    is_void?: string | FilterOperator
    discounts?: string | FilterOperator
    achievement_counted?: string | FilterOperator
    department?: string | FilterOperator
    order_id?: string | FilterOperator
    order_external_id?: string | FilterOperator
    meta?: string | FilterOperator
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

export type TransactionRedemption = {
  id: number
  type: string | null
  total: number | null
  total_localised: number | null
  location_id: number | null
  location: {
    id: number
    name: string | null
    external_id: string | null
  } | null
  items: RedemptionItem[]
}

export type TransactionStaff = {
  id: number
  full_name: string | null
  email: string | null
  identities: Identity[]
}

export type TransactionItemTransaction = {
  transacted_at: string
  receipt_ref: string | null
  external_id: string
  location: {
    id: number
    type: string | null
    name: string | null
    description: string | null
    phone: unknown
    email: string
    external_id: string
    is_published: boolean
    is_permanently_closed: boolean
    address: Address
  } | null
}

export type TransactionItemProduct = {
  title?: string | null
  department?: string | null
  brand?: string | null
  custom_fields?: CustomField[]
}

export type TransactionCurrencyValue = {
  created_at: string
  from: string
  id: number
  rate: number | null
  to: string
  total: number | null
  updated_at: string
}

export type TransactionItemProductListItemList = {
  name: string
  handle: string
  description: string | null
}

export type TransactionIncentiveEstimateResponse = {
  data: Record<string, any> | Record<string, any>[]
}

export type TransactionQueueResponse = {
  data: string
}

export type TransactionQueueCreateResponse = {
  data: string
}

export type TransactionBatchJsonResponse = {
  message: string
}

export type BatchTransactionJsonItem = {
  currency?: string | null
  currency_value?: CurrencyRate
  custom_fields?: CustomFieldItem[]
  external_id?: string | null
  external_order_id?: string | null
  id?: number | null
  is_void?: boolean | null
  items: BatchTransactionJsonItemItemsItem[] | null
  linked_receipt_ref?: string | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
  need_action?: boolean | null
  order_id?: number | null
  order_number?: string | null
  payments?: string[]
  profile_id?: string | null
  profile_id_handle?: string | null
  receipt_email?: string | null
  receipt_is_email?: boolean | null
  receipt_ref?: string | null
  redemption_id?: number | null
  rounding?: number | null
  staff_id?: string | null
  status?: string | null
  systems?: string[]
  tags?: string[]
  tender?: string | null
  timezone: string
  total: number
  total_original?: number | null
  transacted_at: string
  type?: string | null
}

export type RequestLinkTransactionItemListItem = {
  product_list_item_id: number
  type: LinkTransactionItemListItemTypeEnum
}

export type RequestMockTransaction = {
  items: MockTransactionItemsItem[] | null
  location_id?: number | null
  profile_id?: string | null
  profile_id_handle?: string | null
  timezone: string
  total: number
  transacted_at: string
  trigger_id: number
}

export type RequestCreateTransaction = {
  currency?: string | null
  currency_value?: CurrencyRate
  custom_fields?: CustomFieldItem[]
  external_id?: string | null
  external_order_id?: string | null
  fees?: AnyJsonRecord | null
  is_void?: boolean | null
  items: TransactionItemsItem[] | null
  linked_receipt_ref?: string | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
  need_action?: boolean | null
  order_id?: number | null
  order_number?: string | null
  organisation_id?: number | null
  payments?: string[]
  profile_id?: string | null
  profile_id_handle?: string | null
  receipt_email?: string | null
  receipt_is_email?: boolean | null
  receipt_ref?: string | null
  redemption_id?: number | null
  rounding?: number | null
  staff_id?: string | null
  status?: string | null
  systems?: string[]
  tags?: string[]
  tender?: string | null
  timezone: string
  total: number
  total_original?: number | null
  transacted_at: string
  type?: string | null
}

export type RequestUpdateTransaction = {
  currency?: string | null
  currency_value?: CurrencyRate
  custom_fields?: CustomFieldItem[]
  external_id?: string | null
  external_order_id?: string | null
  fees?: AnyJsonRecord | null
  is_void?: boolean | null
  items?: TransactionItemsItem[] | null
  linked_receipt_ref?: string | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
  need_action?: boolean | null
  order_id?: number | null
  order_number?: string | null
  organisation_id?: number | null
  payments?: string[]
  profile_id?: string | null
  profile_id_handle?: string | null
  receipt_email?: string | null
  receipt_is_email?: boolean | null
  receipt_ref?: string | null
  redemption_id?: number | null
  rounding?: number | null
  staff_id?: string | null
  status?: string | null
  systems?: string[]
  tags?: string[]
  tender?: string | null
  timezone?: string
  total?: number
  total_original?: number | null
  transacted_at?: string
  type?: string | null
}

export type RequestTriggerTransactionEvent = {
  event: TriggerTransactionEventEventEnum
}

export type RequestUpdateCreateTransaction = {
  currency?: string | null
  delete_existing_items?: boolean | null
  external_id?: string | null
  id?: number | null
  is_void?: boolean | null
  items?: UpdateCreateTransactionItemsItem[] | null
  linked_receipt_ref?: string | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
  need_action?: boolean | null
  payments?: string[]
  profile_id?: string | null
  profile_id_handle?: string | null
  receipt_email?: string | null
  receipt_is_email?: boolean | null
  receipt_ref?: string | null
  redemption_id?: number | null
  rounding?: number | null
  staff_id?: string | null
  systems?: string[]
  tags?: string[]
  tender?: string | null
  timezone?: string
  total?: number
  total_original?: number | null
  transacted_at?: string
}

export type TransactionItemProductListItem = {
  created_at: string
  id: number
  list: TransactionItemProductListItemList
    | []
  meta: AnyJsonRecord | null
  pivot: Timestamps | []
  position: number | null
  product_list_id: number
  quantity: number | null
  status: string | null
  updated_at: string
}

export type RequestBatchTransactionJson = {
  items?: QuantityRecord[]
  transactions: BatchTransactionJsonItem[] | null
}

export type TransactionItem = {
  created_at: string
  department: string | null
  discounts: DiscountRecord | DiscountRecord[] | null
  external_id: string
  id: number
  is_return: boolean
  is_void: boolean
  list_items?: TransactionItemProductListItem[]
  meta: AnyJsonRecord | null
  name: string | null
  order_id: number
  pivot: Timestamps | []
  price_current: number | null
  price_margin: number | null
  price_original: number | null
  price_sell: number | null
  price_tax: number | null
  product?: TransactionItemProduct
  product_id: number
  product_images: ImageSortItem[] | null
  product_variant?: ProductVariant
  product_variant_id: number
  quantity: number
  sku: string | null
  transaction?: TransactionItemTransaction
  transaction_id: number
  updated_at: string
  variant_external_id: string
}

export type TransactionItemResponse = {
  data: TransactionItem[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Transaction = {
  claimed_at: string | null
  created_at: string
  currency: string | null
  currency_id: number
  currency_rate: number | null
  currency_values: TransactionCurrencyValue[]
  custom_fields: CustomField[]
  external_id: string
  external_order_id: string | null
  fees: AnyJsonRecord[] | null
  id: number
  is_void: boolean
  items: TransactionItem[]
  linked_receipt_ref: string | null
  location: Location | null
  margin: number | null
  meta: AnyRecord | null
  need_action: boolean
  order_id: number
  order_number: string | null
  organisation: Organisation | null
  payments: AnyJsonRecord | null
  profile: EmailRecord
  profile_id: string
  receipt_email: string | null
  receipt_is_email: boolean
  receipt_ref: string | null
  redemption: TransactionRedemption | null
  reversed_redemptions: Redemption[]
  rounding: number | null
  staff: TransactionStaff | null
  status: string | null
  systems: string[] | null
  tags: string[]
  tier_points?: TierPointBasic[]
  timezone: string | null
  total: number | null
  total_converted: number | null
  total_original: number | null
  transacted_at: string | null
  type: string | null
  updated_at: string
}

export type TransactionResponse = {
  data: Transaction[]
  meta?: PaginationMeta
  links?: PaginationLink
}
