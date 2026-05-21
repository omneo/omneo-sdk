import { RequestParams, Automation, AutomationActionResponse, UpdateAutomationActionsItem, CreateAutomationActionsItem } from '@types'
import Resource from '../../resource.js'

export default class AutomationActions extends Resource {
  list (automationId: number, params?: RequestParams): Promise<AutomationActionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/automations/${automationId}/actions`,
      params
    })
  }

  get (automationId: number, actionId: number): Promise<Automation> {
    return this.client.call({
      method: 'GET',
      endpoint: `/automations/${automationId}/actions/${actionId}`
    }).then((response) => {
      return response.data
    })
  }

  create (automationId: number, body: CreateAutomationActionsItem): Promise<AutomationActionResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: `/automations/${automationId}/actions`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (automationId: number, actionId: number, body: UpdateAutomationActionsItem): Promise<AutomationActionResponse> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/automations/${automationId}/actions/${actionId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (automationId: number, actionId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/automations/${automationId}/actions/${actionId}`
    })
  }
}
