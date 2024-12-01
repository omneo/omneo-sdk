import { RequestParams, Webhook, WebhookResponse } from '../../../types'
import Resource from '../resource.js'

export default class Webhooks extends Resource {
  get (id: number, params?: RequestParams): Promise<Webhook> {
    return this.client.call({
      method: 'get',
      endpoint: `/webhooks/${id}`,
      params
    }).then((response) => response.data)
  }

  list (params?: RequestParams): Promise<WebhookResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/webhooks',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: any): Promise<Webhook> {
    return this.client.call({
      method: 'post',
      endpoint: '/webhooks',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: any): Promise<Webhook> {
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
