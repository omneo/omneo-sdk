import { Product } from './product'
import { ProductVariant } from './productVariant'
import { Profile } from './profile'
import { CustomFieldInput } from './general'

export type ListItemInput = {
  product_variant_sku?: string
  product_variant_barcode?: string
  product_category_id?: number
  product_variant_id?: number
  product_id?: number
  external_id?: string
  quantity?: number
  position?: number | null
  status?: string | null
  meta?: { [key: string]: any } | null
  source?: string | null
  location_id?: number | null
}

export type ListInput = {
  name: string
  list_definition_id?: number
  handle?: string
  sort_order?: number
  custom_date?: string | null
  staff_id?: string | null
  location_id?: any | null
  update_items_only?: boolean | null // When set, specified list items will not ovwerwrite existing items, only update existing
  items?: ListItemInput[] | null
  tags?: string[] | null
  custom_fields?: CustomFieldInput | null
  meta?: { [key: string]: any } | null
  description?: string | null
}

export type ListItem = {
  id: number
  product_list_id: number
  product_category: null | string
  product_variant: ProductVariant
  product: Product
  custom_product: any
  created_at: string
  updated_at: string
  quantity: number
  position: null | number
  status: null | string
  meta: null | { [key: string]: any }
  source: null | any
  location: Location
  reservations: any[]
}
export type ListDefinition = {
  id: number
  name: string
  handle: string
  type: string
  icon: null | string
  cover: null | string
  short_description: null | string
  description: null | string
  allow_share: boolean
  allow_quantity: boolean
  allow_reserve: boolean
  allow_custom_product: boolean
  meta: null | { [key: string]: any }
  is_published: boolean
  is_active: boolean
  allow_edit: boolean
  allow_new: boolean
  allow_delete: boolean
  tags: string[]
}

export type List = {
  id: number
  profile_id: string
  name: string
  description: null | string
  meta: null | { [key: string]: any }
  handle: string
  sort_order: null | number
  items: any[]
  is_shared: boolean
  shares: any[]
  tags: any[]
  custom_fields: any[]
  definition: ListDefinition
  custom_date: null | string
  location: Location
  staff: null | Profile
  created_at: string
  updated_at: string
}
