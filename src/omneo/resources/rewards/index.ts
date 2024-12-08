import { RewardInput, RequestParams, Reward, RewardResponse } from '../../../types'
import Resource from '../resource.js'

export default class Rewards extends Resource {
  get (id: string, params?: RequestParams): Promise<Reward> {
    return this.client.call({
      method: 'get',
      endpoint: `/rewards/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<RewardResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/rewards',
      params
    })
  }

  create (body: RewardInput): Promise<Reward> {
    return this.client.call({
      method: 'post',
      endpoint: '/rewards',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: RewardInput): Promise<Reward> {
    return this.client.call({
      method: 'put',
      endpoint: `/rewards/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/rewards/${id}`
    })
  }
}
