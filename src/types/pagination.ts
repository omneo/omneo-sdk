export type PaginationLink = {
    first: string
    last: string
    prev: string | null
    next: string | null
}

export type LinkType = {
    url: string | null
    label: string | null
    active: boolean
}

export type PaginationMeta = {
    current_page: number
    from: number
    last_page: number
    links: LinkType[]
    path: string
    per_page: number
    to: number
    total: number
}

export type PaginationResponse = {
    links: PaginationLink
    meta: PaginationMeta
}
