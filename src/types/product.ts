import { CustomField } from './general'
import { PaginationResponse } from './pagination'
import { ProductVariant } from './productVariant'

export type Product = {
    id: number
    title: string
    handle: string
    type: string
    external_id: string
    status: string
    brand: string
    department: any
    link_brand?: string
    link_department?: null | string
    description: string
    web_url: null | string
    currency: null | string
    position: number
    images: {
        url: string
        sort_order: number
    }[]
    systems: any[]
    channels: any[]
    tags: string[]
    options: any[]
    custom_fields: CustomField[]
    variants: ProductVariant[]
    organisation: any
    meta: { [key: string]: any }
    created_at: string
    updated_at: string
}

export type ProductResponse = PaginationResponse & {
    data: Product[]
}
