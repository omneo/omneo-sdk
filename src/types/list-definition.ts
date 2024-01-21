import { CustomFields } from './custom-fields';

export type ListDefinition = {
    id: number
    name: string
    handle: string
    type: 'custom'
        | 'cart'
        | 'appointment'
        | 'wedding-registry'
        | 'gift-registry'
        | 'store'
        | 'stylist'
        | 'other'
    icon: unknown | null
    cover: unknown | null
    short_description: string
    description: string | null
    allow_share: boolean
    allow_quantity: boolean
    allow_reserve: boolean
    allow_custom_product: boolean
    meta: CustomFields | null
    is_published: boolean
    is_active: boolean
    tags: Array<string>
}