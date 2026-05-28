// Route category: orders

import type { AnyJsonRecord, AnyRecord, CurrencyRate, DiscountRecord, EmailRecord, ExternalIdNullableRecord, FilterOperator, ImageSortItem, ProductVariantRecord, QuantityRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { CustomField, CustomFieldItem } from './custom-fields'
import type { Location } from './locations'
import type { Organisation } from './organisations'
import type { ProductVariant } from './products'
import type { RedemptionItem } from './redemptions'
import type { Transaction } from './transactions'
import type { Identity } from './identities'

export type BatchOrderJsonItemItemsItem = {
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
  sku?: string
  variant_external_id?: string | null
}

export type CreateOrderItemsItem = {
  department?: string | null
  discounts?: DiscountRecord | DiscountRecord[] | null
  external_id?: string | null
  meta?: AnyJsonRecord | null
  name: string
  price_current?: number
  price_margin?: number | null
  price_original?: number | null
  price_sell?: number
  product_variant?: ProductVariantRecord | null
  product_variant_id?: number | null
  product_variant_sku?: string | null
  quantity: number
  sku?: string
  variant_external_id?: string | null
}

export type RequestCreateOrderItem = {
  is_void?: boolean | null
  name: string
  price_current: number
  price_margin?: number | null
  price_original?: number | null
  price_sell: number
  product_variant_id?: number | null
  quantity: number
  tags?: string[]
}

export type UpdateOrderItemsItem = {
  department?: string | null
  discounts?: string[] | null
  external_id?: string | null
  meta?: AnyJsonRecord | null
  name: string
  price_current?: number
  price_margin?: number | null
  price_original?: number | null
  price_sell?: number
  product_variant?: ProductVariantRecord | null
  product_variant_id?: number | null
  product_variant_sku?: string | null
  quantity: number
  sku?: string
  variant_external_id?: string | null
}

export type RequestUpdateOrderItem = {
  is_void?: boolean | null
  name?: string
  price_current?: number
  price_margin?: number | null
  price_original?: number | null
  price_sell?: number
  product_variant_id?: number
  quantity?: number
  tags?: string[]
}

export type RequestQueryOrder = {
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
    deliver_at?: string | FilterOperator
    transacted_at?: string | FilterOperator
    timezone?: string | FilterOperator
    receipt_is_email?: string | FilterOperator
    receipt_ref?: string | FilterOperator
    location_id?: string | FilterOperator
    systems?: {
      handle?: string | FilterOperator
    }
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
    type?: string | FilterOperator
    status?: string | FilterOperator
    order_number?: string | FilterOperator
    due_date?: string | FilterOperator
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

export type RequestQueryOrderItem = {
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
    department?: string | FilterOperator
    order_id?: string | FilterOperator
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

export type OrderRedemption = {
  id: number
  type: string | null
  total: number | null
  total_localised: number | null
  location_id: number | null
  location: ExternalIdNullableRecord | null
  items: RedemptionItem[]
}

export type OrderStaff = {
  id: number
  full_name: string | null
  email: string | null
  identities: Identity[]
}

export type OrderItemOrder = {
  transacted_at: string
  receipt_ref: string | null
  external_id: string
}

export type OrderItemProduct = {
  title?: string | null
  department?: string | null
  brand?: string | null
  custom_fields?: CustomField[]
}

export type OrderQueueResponse = {
  data: string
}

export type OrderQueueCreateResponse = {
  data: string
}

export type OrderBatchJsonResponse = {
  message: string
}

export type BatchOrderJsonItem = {
  currency?: string | null
  currency_value?: CurrencyRate
  custom_fields?: CustomFieldItem[]
  external_id?: string | null
  external_order_id?: string | null
  id?: number | null
  is_void?: boolean | null
  items: BatchOrderJsonItemItemsItem[] | null
  location_id?: string | null
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

export type RequestCreateOrder = {
  currency?: string | null
  custom_fields?: CustomFieldItem[]
  due_date?: string | null
  external_id?: string | null
  fees?: AnyJsonRecord | null
  is_void?: boolean | null
  items: CreateOrderItemsItem[] | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
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

export type RequestCreateUpdateOrder = {
  currency?: string | null
  custom_fields?: CustomFieldItem[]
  due_date?: string | null
  external_id?: string | null
  fees?: AnyJsonRecord | null
  is_void?: boolean | null
  items: CreateOrderItemsItem[] | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
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

export type RequestUpdateOrder = {
  currency?: string | null
  custom_fields?: CustomFieldItem[]
  due_date?: string | null
  external_id?: string | null
  fees?: AnyJsonRecord | null
  is_void?: boolean | null
  items?: UpdateOrderItemsItem[] | null
  location_id?: number | null
  margin?: number | null
  meta?: AnyJsonRecord | null
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

export type OrderItem = {
  created_at: string
  department: string | null
  discounts: DiscountRecord | DiscountRecord[] | null
  external_id: string
  id: number
  is_void: boolean
  meta: AnyJsonRecord | null
  name: string | null
  order?: OrderItemOrder
  order_id: number
  price_current: number | null
  price_margin: number | null
  price_original: number | null
  price_sell: number | null
  price_tax: number | null
  product?: OrderItemProduct
  product_id: number
  product_images: ImageSortItem[] | null
  product_variant?: ProductVariant
  product_variant_id: number
  quantity: number
  sku: string | null
  updated_at: string
  variant_external_id: string
}

export type RequestBatchOrderJson = {
  items?: QuantityRecord[]
  orders: BatchOrderJsonItem[] | null
}

export type OrderItemResponse = {
  data: OrderItem[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type Order = {
  claimed_at: string | null
  created_at: string
  currency: string | null
  currency_id: number
  currency_rate: number | null
  custom_fields: CustomField[]
  due_date: string | null
  external_id: string
  fees: AnyRecord | null
  id: number
  is_void: boolean
  items: OrderItem[]
  location: Location | null
  margin: number | null
  meta: AnyRecord | null
  order_number: string | null
  organisation: Organisation | null
  payments: AnyJsonRecord | null
  profile: EmailRecord | null
  profile_id: string
  receipt_email: string | null
  receipt_is_email: boolean
  receipt_ref: string | null
  redemption: OrderRedemption | null
  rounding: number | null
  staff: OrderStaff | null
  status: string | null
  systems: string[]
  tags: string[]
  timezone: string | null
  total: number | null
  total_original: number | null
  transacted_at: string | null
  transactions: Transaction[]
  type: string | null
  updated_at: string
}

export type OrderResponse = {
  data: Order[]
  meta?: PaginationMeta
  links?: PaginationLink
}
