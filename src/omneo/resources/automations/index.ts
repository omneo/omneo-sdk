import { Automation, AutomationActionResponse, AutomationInput, AutomationResponse } from '../../../types'
import { RequestParams } from '../../../types/omneo.js'
import Resource from '../resource.js'

export default class Automations extends Resource {
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

  create (body: AutomationInput): Promise<Automation> {
    return this.client.call({
      method: 'post',
      endpoint: '/automations',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<AutomationInput>): Promise<Automation> {
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

  actions (id: number): Promise<AutomationActionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/automations/${id}/actions`
    })
  }
}
