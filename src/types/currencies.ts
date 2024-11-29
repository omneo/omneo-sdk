import { PaginationResponse } from './pagination'

export type Currency = {
    id: number
    from: string
    to: string
    rate: number
    is_system: boolean
    created_at: string
    updated_at: string
}

export type CurrencyInput = {
  from: string
  to: string
  rate: number
  is_system?: boolean
}

export type CurrencyResponse = PaginationResponse & {
  data: Currency[]
}
