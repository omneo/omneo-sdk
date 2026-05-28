// Route category: list

import type { AnyJsonRecord, DiscountRecord, ProfileSummary, TimestampPivot, ImageSortItem, TransactionSummary } from './common'
import type { CustomProduct } from './customproducts'
import type { ProductImageItem, ProductVariant } from './products'
import type { Profile } from './profiles'
import type { Address } from './address'
import type { CustomField } from './custom-fields'

export type Category = {
  created_at: string
  id: number
  name: string | null
  updated_at: string
}

export type RequestCreateProductListReservation = {
  expires_at?: string | null
  external_profile_id?: string | null
  profile_id?: string
  quantity: number
  timezone?: string | null
}

export type RequestUpdateProductListReservation = {
  expires_at?: string | null
  quantity: number
  timezone?: string | null
}

export type ListItemTransactionItem = {
  created_at: string
  department: string | null
  discounts: DiscountRecord | DiscountRecord[] | null
  external_id: string
  id: number
  is_return: boolean
  is_void: boolean
  meta: AnyJsonRecord | null
  name: string | null
  order_id: number
  pivot: TimestampPivot | []
  price_current: number | null
  price_margin: number | null
  price_original: number | null
  price_sell: number | null
  price_tax: number | null
  product_id: number
  product_images: ImageSortItem[]
  product_variant_id: number
  quantity: number
  sku: string | null
  transaction?: TransactionSummary & { profile: ProfileSummary | null }
  transaction_id: number
  updated_at: string
  variant_external_id: string
}

export type ProductListItemProduct = {
  id: number
  title: string | null
  handle: string | null
  external_id: string
  status: string
  brand: string | null
  description: string | null
  web_url: string | null
  currency: string | null
  position: number
  images: ProductImageItem[] | null
  systems: string[]
  channels: string[]
  tags: string[]
  options: Record<string, any[]>
  custom_fields: CustomField[]
  variants: ProductVariant[]
  created_at: string
  updated_at: string
}

export type ProductListItemLocation = {
  id: number
  type: string | null
  name: string | null
  description: string | null
  phone: string | null
  email: string | null
  external_id: string | null
  is_published: boolean
  is_permanently_closed: boolean
  address: Address | null
}

export type ProductListReservation = {
  created_at: string
  expires_at: string | null
  external_profile_id: number
  id: number
  product_list_id: number
  product_list_item_id: number
  profile: Profile | null
  quantity: number | null
  timezone: string | null
  updated_at: string
}

export type ProductListItem = {
  created_at: string
  custom_product: CustomProduct | null
  id: number
  location: ProductListItemLocation | null
  meta: AnyJsonRecord | null
  num_items?: number | null
  position: number | null
  product: ProductListItemProduct | null
  product_category: Category
  product_list_id: number
  product_variant: ProductVariant
  quantity: number | null
  reservations: ProductListReservation[]
  source: string
  status: string | null
  transaction_items?: ListItemTransactionItem[]
  updated_at: string
}

export type ProductListReservationNested = {
  created_at: string
  expires_at: string | null
  external_profile_id: number
  id: number
  product_list_id: number
  product_list_item: ProductListItem
  profile: Profile | null
  quantity: number | null
  timezone: string | null
  updated_at: string
}
