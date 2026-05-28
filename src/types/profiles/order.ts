import type { Order } from '../orders'
import type { PaginationLink } from '../pagination'
export type ProfileGroupOrder = {
  order_number: string | null
  order_id: number
  number_orders: number
  total: number
  latest_updated_at: string
  latest_transacted_at: string
  orders: Order[]
}

export type ProfileOrderGroupResponse = {
  current_page: number
  data: ProfileGroupOrder[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}
