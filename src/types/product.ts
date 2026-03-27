import { CustomField, CreateCustomFieldInput } from './custom-field'
import { PaginationResponse } from './pagination'
import { ProductVariant, CreateProductVariantInput, UpdateProductVariantInput } from './productVariant'
import { Tag } from './tags'
import { Address } from './address'
import { ListDefinition, ListItemReservation, ListItemTransactionItem } from './list'
import { Identity } from './identities'
import { Organisation } from './organisation'

export type Product = {
  id: number
  title: string
  handle: string
  type: string
  external_id: string | null
  status: string
  brand: string
  department: string | null
  link_brand: string | null
  link_department: string | null
  description: string | null
  web_url: null | string
  currency: null | string
  position: number | null
  images: {
    url: string
    sort_order: number | null
  }[]
  systems: string[]
  channels: string[]
  tags: Tag[]
  options: { [name: string]: string[] }
  custom_fields: CustomField[]
  variants: ProductVariant[]
  organisation: Organisation | null
  meta: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type CustomProduct = {
  id: number
  name: string
  description: string
  barcode: string | null
  sku: string | null
  url: string | null
  price: string | null | number
  currency: string | null
  image_url: string | null
  product_id: string | null
  created_at: string
  updated_at: string
}

export type CreateCustomProductInput = {
  name: string
  description?: string | null
  barcode?: string | null
  sku?: string | null
  url?: string | null
  price?: number | null
  currency?: string | null
  image_url?: string | null
  product_id?: number | null
}

export type UpdateCustomProductInput = Omit<Partial<CreateCustomProductInput>, 'name' | 'product_id'> & {
  name?: string
  product_id?: number
}

export type ProductImageInput = {
  url: string
  sort_order?: number | null
}

export type CreateProductInput = {
  title: string
  handle: string
  external_id?: string | null
  type?: string | null
  status?: string
  brand: string
  department?: string | null
  description?: string | null
  currency?: string | null
  position?: number | null
  web_url?: string | null
  systems?: string[]
  channels?: string[]
  tags?: string[]
  images?: ProductImageInput[]
  meta?: { [key: string]: any } | null
  variants?: CreateProductVariantInput[]
  custom_fields?: Pick<CreateCustomFieldInput, 'namespace' | 'handle' | 'type' | 'value'>[]
  organisation_id?: number | null
}

export type UpdateProductVariantInputWithId = UpdateProductVariantInput & {
  id?: number | null
}

export type UpdateProductInput = Omit<Partial<CreateProductInput>, 'handle'> & {
  title?: string | null
  position?: number | null
  archive_existing_variants?: boolean | null
  variants?: UpdateProductVariantInputWithId[]
}

export type ProductResponse = PaginationResponse & {
    data: Product[]
}

export type CustomProductResponse = PaginationResponse & {
  data: CustomProduct[]
}

export type ProductListCategory = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type ProductListItem = {
  id: number
  product_list_id: number
  product_category: ProductListCategory
  product_variant: ProductVariant
  product: Product | null
  custom_product: CustomProduct | null
  quantity: number
  position: number
  status: string
  meta: { [key: string]: any } | null
  source: string
  location: {
    id: number
    type: string
    name: string
    description: string
    phone: string
    email: string
    external_id: string
    is_published: boolean
    is_permanently_closed: boolean
    address: Address
  } | null
  reservations: ListItemReservation[]
  created_at: string | null
  updated_at: string | null
  num_items?: number | null
  transaction_items?: ListItemTransactionItem[] | null
}

export type ProductListShare = {
  id: number
  handle: string
  profile_id: string
  product_list_id: number
  created_at: string
  updated_at: string
}

export type ProductList = {
  id: number
  profile_id: string
  profile: {
    id: string
    first_name: string
    last_name: string
    email: string
  } | null
  name: string
  description: string
  meta: { [key: string]: any } | null
  handle: string
  sort_order: number
  items: ProductListItem[]
  is_shared: boolean
  shares: ProductListShare[]
  tags: Tag[]
  custom_fields: CustomField[]
  definition: ListDefinition | null
  custom_date: string | null
  location: {
    id: number
    type: string
    name: string
    description: string
    phone: string
    email: string
    external_id: string
    is_published: boolean
    is_permanently_closed: boolean
    address: Address
  } | null
  staff: {
    id: number
    full_name: string
    email: string
    identities: Identity[]
  } | null
  organisation: { [key: string]: any } | null
  created_at: string
  updated_at: string
}

export type ProductListNoPII = Omit<ProductList, 'profile' | 'staff'> & {
  location: Omit<ProductList['location'], 'email' | 'phone'> | null
}

export type ProductListResponse = PaginationResponse & {
  data: ProductList[]
}
