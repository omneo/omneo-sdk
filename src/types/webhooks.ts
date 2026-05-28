// Route category: webhooks

import type { FilterOperator, AnyJsonRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'

export type WebhookQueueEnum = 'high' | 'default' | 'low'

export type RequestBatchWebhookJson = {
  action_ids?: number[]
  dispatch_actions?: boolean
  dispatch_webhooks?: boolean
  event_context: string
  identifiers: string[]
  webhook_ids?: number[]
}

export type RequestQueryWebhook = {
  offset?: number
  limit?: number
  filter?: {
    trigger?: string | FilterOperator
    url?: string | FilterOperator
    namespace?: string | FilterOperator
    is_active?: string | FilterOperator
    retry_daily?: string | FilterOperator
    retry_hourly?: string | FilterOperator
    queue?: string | FilterOperator
    condition?: string | FilterOperator
    extra_data_template?: string | FilterOperator
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

export type WebhookBatchJsonResponse = {
  message: string
}

export type RequestCreateWebhook = {
  condition?: AnyJsonRecord | null
  extra_data_template?: string | null
  is_active?: boolean | null
  namespace: string
  queue?: WebhookQueueEnum | null
  retry_daily?: boolean | null
  retry_hourly?: boolean | null
  trigger: string
  url: string
}

export type RequestUpdateWebhook = {
  condition?: AnyJsonRecord | null
  extra_data_template?: string | null
  is_active?: boolean
  queue?: WebhookQueueEnum | null
  retry_daily?: boolean | null
  retry_hourly?: boolean | null
  trigger?: string
  url?: string
}

export type Webhook = {
  condition: AnyJsonRecord | null
  created_at: string
  extra_data_template: string | null
  id: number
  is_active: boolean
  namespace: string
  queue: WebhookQueueEnum | null
  retry_daily: boolean
  retry_hourly: boolean
  trigger: string
  updated_at: string
  url: string
  user_id: number
}

export type WebhookResponse = {
  data: Webhook[]
  meta?: PaginationMeta
  links?: PaginationLink
}
