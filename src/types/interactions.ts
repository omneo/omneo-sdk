// Route category: interactions

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Identity } from './identities'
import type { Location } from './locations'
import type { Organisation } from './organisations'
import type { Profile } from './profiles'

export type InteractionActionEnum = 'broadcast' | 'disclose' | 'feedback' | 'product' | 'reach' | 'refer' | 'service' | 'visit' | 'view'

export type InteractionChannelEnum = 'app' | 'email' | 'location' | 'push' | 'sms' | 'social' | 'support' | 'website'

export type InteractionSignalEnum = '-1' | '0' | '1'

export type InteractionIdentifier = {
  handle?: string | null
  id?: string | null
}

export type RequestQueryInteraction = {
  offset?: number
  limit?: number
  filter?: {
    id?: string | FilterOperator
    profile_id?: string | FilterOperator
    action?: string | FilterOperator
    channel?: string | FilterOperator
    signal?: string | FilterOperator
    name?: string | FilterOperator
    namespace?: string | FilterOperator
    description?: string | FilterOperator
    url?: string | FilterOperator
    duration?: string | FilterOperator
    latitude?: string | FilterOperator
    longitude?: string | FilterOperator
    updated_at?: string | FilterOperator
    created_at?: string | FilterOperator
    interacted_at?: string | FilterOperator
    interacted_id?: string | FilterOperator
    interacted_type?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
  [key: string]: any
}

export type Interaction = {
  action: InteractionActionEnum
  channel: InteractionChannelEnum
  created_at: string
  description: string | null
  duration: number | null
  id: number
  identity: Identity
  interacted_at: string | null
  interacted_id: number
  interacted_type: string | null
  latitude: number | null
  location: Location | null
  location_id: number
  longitude: number | null
  meta: AnyRecord | null
  name: string | null
  namespace: string
  organisation: Organisation | null
  product_category_id: number
  product_id: number
  product_variant_id: number
  profile: Profile
  signal: InteractionSignalEnum
  staff_id: string
  tags: string[]
  updated_at: string
  url: string | null
}

export type RequestCreateInteraction = {
  action: InteractionActionEnum
  channel: InteractionChannelEnum
  description?: string | null
  duration?: number | null
  identifier?: InteractionIdentifier
  interacted_at?: string | null
  interacted_id?: number | null
  interacted_type?: 'profile' | 'product' | 'transaction' | 'reward' | 'benefit' | 'point' | 'user' | 'tenant' | 'list' | 'listItem' | 'target' | 'automation' | 'trigger' | 'aggregation' | 'comms_attribute' | 'appearance_attribute' | 'webhook' | 'identity' | 'tier' | 'address' | 'location' | 'product_variant' | 'benefit_definition' | 'reward_definition' | 'tier_definition' | 'transaction_item' | 'order' | 'redemption' | 'tier_point' | 'interaction' | 'status' | 'organisation' | 'role_definition' | 'credit_definition' | 'credit' | 'product_list_reservation' | 'appointment_definition' | 'appointment' | 'question' | 'questionnaire' | 'questionnaire_answer' | 'questionnaire_submission' | 'rating' | 'custom_attribute' | 'connection' | null
  latitude?: number | null
  location_id?: number
  longitude?: number | null
  meta?: AnyJsonRecord | null
  name: string
  namespace: string
  organisation_id?: number | null
  product_category_id?: number
  product_id?: number
  product_variant_id?: number
  profile_id?: string
  signal: InteractionSignalEnum
  staff_id?: string
  tags?: string[]
  url?: string | null
}

export type RequestUpdateInteraction = {
  action?: InteractionActionEnum
  channel?: InteractionChannelEnum
  description?: string | null
  duration?: number | null
  identifier?: InteractionIdentifier
  latitude?: number | null
  location_id?: number
  longitude?: number | null
  meta?: AnyJsonRecord | null
  name?: string
  namespace?: string
  organisation_id?: number | null
  product_category_id?: number
  product_id?: number
  product_variant_id?: number
  profile_id?: string
  signal?: InteractionSignalEnum
  staff_id?: string
  tags?: string[]
  url?: string | null
}

export type InteractionResponse = {
  data: Interaction[]
  meta?: PaginationMeta
  links?: PaginationLink
}
