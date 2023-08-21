import { Location } from './location'
import { Profile } from './profile'
import { Transaction, TransactionItem } from './transaction'

export type Order = {
  id: number
  external_id: string | null
  redemption_id: number
  redemption: any // TODO Add Redemption type
  profile_id: string
  staff_id: string
  staff: Profile
  profile: Profile
  location_id: number
  location: Location
  currency_id: number
  currency: any // #TODO add Currency type
  total: number
  is_void: boolean
  total_original: number
  currency_rate: number
  rounding: number
  margin: number
  deliver_at: Date | null
  claimed_at: Date | null
  transacted_at: Date
  meta: { [key: string]: any }
  tags: Array<any> // TODO add tag type
  systems: Array<any> // TODO add systems type
  items: Array<TransactionItem>
  transactions: Array<Transaction>
  payload: Array<any> // TODO add payments type
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

export type OrderItem = {
  id: number
  profile_id: string
  profile: {
    flattened_statuses: Array<string>
    email: string
  }
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
  discounts: Array<any> // TODO Add discount type
  custom_fields: { [key: string]: any }
  department: string
  created_at: Date
  updated_at: Date
}
