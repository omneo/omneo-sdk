export type AnonymousResourceResponse = Record<string, unknown>

export type AnyJsonRecord = { [key: string]: any }

export type RequestNoBody = Record<never, never>

export type RequestQuery = {
  offset?: number
  limit?: number
  filter?: {
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
}

export type RequestRequest = Record<string, any>

export type ApiResponseNoContent = void

export type CommsChannel = 'email' | 'sms' | 'post' | 'push' | 'phone'

export type CurrencyRate = {
  from?: string
  rate?: number | null
  to?: string | null
}

export type CustomFieldsGrouped = {
  [namespace: string]: { [handle: string]: any }
}

export type DiscountRecord = {
  reason_desc?: string
  [key: string]: any
}

export type EmailRecord = {
  email: string
}

export type ExternalIdRecord = {
  id: number
  name: string | null
  external_id: string
}

export type FilterOperator = {
  eq?: string
  ne?: string
  gt?: string
  gte?: string
  lt?: string
  lte?: string
  in?: string
  nullable?: 0 | 1
}

export type PeriodType = | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'absolute_date'
  | 'absolute_week'
  | 'absolute_month'

export type ProductVariantRecord = {
  brand: string
  category: string
  price: number
  product_id: number
  sku: string
  subcategory?: string | null
  title: string
}

export type ProfileSummary = {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
}

export type QuantityRecord = {
  quantity: number
}

export type TransactionSummary = {
  transacted_at: string
  receipt_ref: string | null
  external_id: string
}

export type ImageSortItem = {
  url: string
  sort_order: number
}

export type LocationHandle = {
  id: number
  name: string | null
  handle: string | null
}

export type LocationWithTimezone = {
  id: number
  name: string | null
  handle: string | null
  timezone: string | null
}

export type NamedHandle = {
  id: number
  name: string
  handle: string
}

export type PageSize = {
  size?: number
}

export type Timestamps = { created_at: string; updated_at: string }

export type UserHandle = {
  id: number
  handle: string | null
}

export type AnyRecord = string | number | boolean | AnyJsonRecord | any[]

export type IssuePeriodType = 'hours' | PeriodType

export type ActionArgumentRecord = {
  is_dynamic?: boolean | null
  name: string
  value: AnyRecord | null
}
