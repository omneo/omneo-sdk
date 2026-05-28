import { RequestCreateWebhook, RequestQueryWebhook, RequestUpdateWebhook, Webhook, WebhookResponse } from '@types'
import Resource from '../resource.js'

export default class Webhooks extends Resource {
  get (id: number): Promise<Webhook> {
    return this.client.call({
      method: 'get',
      endpoint: `/webhooks/${id}`
    }).then((response) => response.data)
  }

  list (params?: RequestQueryWebhook): Promise<WebhookResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/webhooks',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateWebhook): Promise<Webhook> {
    return this.client.call({
      method: 'post',
      endpoint: '/webhooks',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateWebhook): Promise<Webhook> {
    return this.client.call({
      method: 'put',
      endpoint: `/webhooks/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/webhooks/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
