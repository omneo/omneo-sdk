import { RequestParams, Automation, AutomationResponse } from '@types'
import Resource from '../resource.js'
import AutomationActions from './actions/index.js'

export default class Automations extends Resource {
  actions = new AutomationActions(this.client)

  get (id: number, params?: RequestParams): Promise<Automation> {
    return this.client.call({
      method: 'get',
      endpoint: `/automations/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AutomationResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/automations',
      params
    })
  }

  create (body: Automation): Promise<Automation> {
    return this.client.call({
      method: 'post',
      endpoint: '/automations',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<Automation>): Promise<Automation> {
    return this.client.call({
      method: 'put',
      endpoint: `/automations/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/automations/${id}`
    })
  }

  trigger (id: number): Promise<void> {
    return this.client.call({
      method: 'post',
      endpoint: `/automations/${id}/trigger`
    })
  }
}
