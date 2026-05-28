import { Automation, AutomationResponse, RequestCreateAutomation, RequestUpdateAutomation, RequestQueryAutomation } from '@types'
import Resource from '../resource.js'
import AutomationActions from './actions/index.js'

export default class Automations extends Resource {
  actions = new AutomationActions(this.client)

  get (id: number): Promise<Automation> {
    return this.client.call({
      method: 'get',
      endpoint: `/automations/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryAutomation): Promise<AutomationResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/automations',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateAutomation): Promise<Automation> {
    return this.client.call({
      method: 'post',
      endpoint: '/automations',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateAutomation): Promise<Automation> {
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
