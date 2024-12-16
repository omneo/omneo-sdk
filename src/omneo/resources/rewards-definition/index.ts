import { RewardDefinitionCreateInput, RewardDefinitionUpdateInput, RequestParams, RewardDefinition, RewardDefinitionResponse } from '../../../types'
import Resource from '../resource.js'

export default class RewardsDefinition extends Resource {
  get (id: number, params?: RequestParams): Promise<RewardDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/rewards/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<RewardDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/rewards/definitions',
      params
    })
  }

  create (body: RewardDefinitionCreateInput): Promise<RewardDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/rewards/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RewardDefinitionUpdateInput): Promise<RewardDefinition> {
    return this.client.call({
      method: 'put',
      endpoint: `/rewards/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/rewards/definitions/${id}`
    })
  }
}
