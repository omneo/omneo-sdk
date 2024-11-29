import { CustomField } from './general'
import { PaginationResponse } from './pagination'
import { ProductVariant } from './productVariant'

export type Product = {
    id: number
    title: string
    handle: string
    external_id: string
    status: string
    brand: string
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
    created_at: string
    updated_at: string
}

export type ProductResponse = PaginationResponse & {
    data: Product[]
}
