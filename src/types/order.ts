import { Location } from './location'
import { Profile, ProfileWebhook } from './profile'
import { Redemption } from './redemption'
import { Transaction } from './transaction'

export type OrderItem = {
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
  transaction: Pick<Transaction, 'transacted_at' | 'receipt_ref' | 'external_id'>
}

export type Order = {
  id: number
  external_id: string
  redemption: Pick<Redemption, 'id' | 'type' | 'total' | 'total_localised'> | null
  profile_id?: string
  profile?: Pick<Profile, 'email'>
  location?: Location
  meta?: {[key: string]: any}
  total: number
  total_original: number | null
  systems: Array<any>
  rounding: number | null
  margin: number | null
  is_void: boolean
  transacted_at: Date
  timezone: string
  tags: Array<string>
  transactions: Array<Transaction>
  items: Array<OrderItem>
  payments: Array<any>
  receipt_is_email: boolean
  receipt_ref: string | null
  claimed_at: Date | null
  receipt_email: string | null
  staff: Pick<Profile, 'id' | 'email' | 'identities'> & {
    full_name: string
  } | null
  currency_id: number | null
  currency_rate: string | null
  currency: string | null
  type: string
  status: string
  order_number: string
  due_date: Date
  created_at: Date
  updated_at: Date
}

export type OrderItemWebhook = {
  id: number
  profile_id: string
  profile: Pick<ProfileWebhook, 'flattened_statuses' | 'email'>
  order_id: string
  order: {
    meta: { [key: string]: any }
    location: Location
    transacted_at: Date
  }
  is_void: boolean
  is_order_void: boolean
  name: string
  quantity: number
  quantity_abs: number
  price_current: number
  price_sell: number
  price_original: number
  price_margin: number
  price_tax: number
  product_variant_id: number
  product_id: number | null
  item_sku: string | null
  variant_external_id: string | null
  sku: string | null
  barcode: string | null
  product_variant_description: string | null
  meta: { [key: string]: any }
  product: {
    brand: string
    department: string
    description: string
  } | null,
  product_options: Array<{
    name: string
    value: any
    sort_order: number
  }>| null
  product_images: Array<{
    url: string | null
    mime_type: string | null
    height: string | null
    sort_order: string | null
  }> | null
  discounts: Array<{
    amount: number
    reason_desc: string
  }>
  custom_fields: { [key: string]: any }
  department: string
  created_at: Date
  updated_at: Date
}

export type OrderWebhook = {
  id: number
  external_id: string | null
  redemption_id: number
  redemption: Redemption
  profile_id: string
  staff_id: string
  staff: Profile
  profile: Profile
  location_id: number
  location: Location
  currency_id: number | null
  currency: string | null
  total: number
  is_void: boolean
  total_original: number
  currency_rate: number | null
  rounding: number
  margin: number
  deliver_at: Date | null
  claimed_at: Date | null
  transacted_at: Date
  meta: { [key: string]: any }
  tags: Array<string>
  systems: Array<string>
  items: Array<OrderItemWebhook>
  transactions: Array<Transaction>
  payment: Array<string>
  receipt_is_email: boolean
  receipt_ref: string
  receipt_email: string
  type: string
  status: string
  order_number: string
  due_date: Date | null
  created_at: Date
  updated_at: Date
}
