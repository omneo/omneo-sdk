import { PaginationResponse } from './pagination'

export type WebhookQueueType = 'low' | 'default' | 'high'
export type Webhook = {
  id: number;
  trigger: string;
  url: string;
  namespace: string;
  user_id: number;
  is_active: boolean;
  retry_daily: boolean | null;
  retry_hourly: boolean;
  created_at: string;
  updated_at: string;
  queue: WebhookQueueType | null
  condition: undefined | {[key: string]: any} | null
}

export type WebhookInput = Omit<Webhook, 'created_at' | 'updated_at' | 'id' | 'user_id'> & {
  retry_daily?: Webhook['retry_daily'];
  retry_hourly?: Webhook['retry_hourly'];
  queue?: Webhook['queue']
  condition?: Webhook['condition']
}

export type WebhookResponse = PaginationResponse & {
  data: Webhook[]
}
