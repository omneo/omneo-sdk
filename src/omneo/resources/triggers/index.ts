import { RequestParams, Trigger, TriggerInput, TriggerResponse, TriggerUpdateInput } from '@types'
import Resource from '../resource.js'
import TriggerActions from './actions/index.js'

export default class Triggers extends Resource {
  actions = new TriggerActions(this.client)

  get (id: number, params?: RequestParams): Promise<Trigger> {
    return this.client.call({
      method: 'get',
      endpoint: `/triggers/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<TriggerResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/triggers',
      params
    })
  }

  create (body: TriggerInput): Promise<Trigger> {
    return this.client.call({
      method: 'post',
      endpoint: '/triggers',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<TriggerUpdateInput>): Promise<Trigger> {
    return this.client.call({
      method: 'put',
      endpoint: `/triggers/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/triggers/${id}`
    })
  }
}
