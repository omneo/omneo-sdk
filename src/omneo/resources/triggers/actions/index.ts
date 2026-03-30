import { RequestParams, TriggerAction, TriggerActionInput, TriggerActionResponse } from '@types'
import Resource from '../../resource.js'

export default class TriggerActions extends Resource {
  list (triggerId: number, params?: RequestParams): Promise<TriggerActionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/triggers/${triggerId}/actions`,
      params
    })
  }

  get (triggerId: number, actionId: number, params?: RequestParams): Promise<TriggerAction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/triggers/${triggerId}/actions/${actionId}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (triggerId: number, body: TriggerActionInput): Promise<TriggerAction> {
    return this.client.call({
      method: 'POST',
      endpoint: `/triggers/${triggerId}/actions`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (triggerId: number, actionId: number, body: Partial<TriggerActionInput>): Promise<TriggerAction> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/triggers/${triggerId}/actions/${actionId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (triggerId: number, actionId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/triggers/${triggerId}/actions/${actionId}`
    })
  }
}
