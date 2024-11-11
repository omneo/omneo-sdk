export type ProductVariant = {
    id: number
    product_id: number
    sku: string
    external_id: string | null
    barcode: string | null
    web_url: string | null
    handle: string | null
    title: string
    description: string | null
    position: number
    price: number
    price_discounted: number | null
    price_comparison: number | null
    price_cost: number | null
    available_quantity: number | null
    images: Array<any>
    meta: { [key: string]: any } | null
    tags: Array<string>
    options: Array<any>
    created_at: string
    updated_at: string
}
