import { Location } from './location'

export type InteractionChannel = 'app' | 'email' | 'location' | 'push' | 'sms' | 'social' | 'support' | 'website'
export type InteractionAction = 'broadcast' | 'disclose' | 'feedback' | 'product' | 'reach' | 'refer' | 'service' | 'visit' | 'view'

export type Interaction = {
  id: number
  identity: string | null
  action: InteractionAction
  channel: InteractionChannel
  signal: -1 | 0 | 1
  name: string
  namespace: string
  latitude: string | null
  longitude: string | null
  description: string | null
  url: string | null
  duration: string | null
  location_id: number | null
  location: Location | null
  product_id: number | null
  staff_id: number | null
  product_category_id: number | null
  product_variant_id: number | null
  tags: Array<string>
  created_at: string
  updated_at: string
  interacted_at: string | null
  meta: {[key: string]: any}
}

export type InteractionInput = {
  identifier?: string | {
    id: string
    handle: string
  }
  profile_id: string
  action: InteractionAction
  channel: InteractionChannel
  signal: -1 | 0 | 1
  name: string
  namespace: string
  latitude?: string | null
  longitude?: string | null
  description?: string | null
  url?: string | null
  duration?: string | null
  location_id?: number | null
  location?: Location | null
  product_id?: number | null
  staff_id?: number | null
  product_category_id?: number | null
  product_variant_id?: number | null
  tags?: Array<string>
  interacted_at?: string | null
  meta: {[key: string]: any}
}
