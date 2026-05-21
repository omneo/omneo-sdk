import { RequestCreateReward, RequestUpdateReward, RequestParams, Reward, RewardResponse, RequestExtendReward } from '@types'
import Resource from '../resource.js'

export default class Rewards extends Resource {
  get (id: number, params?: RequestParams): Promise<Reward> {
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

  create (body: RequestCreateReward): Promise<Reward> {
    return this.client.call({
      method: 'post',
      endpoint: '/rewards',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateReward): Promise<Reward> {
    return this.client.call({
      method: 'put',
      endpoint: `/rewards/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/rewards/${id}`
    })
  }

  triggerTarget (rewardId: number, type: string): Promise<void> {
    return this.client.call({
      method: 'GET',
      endpoint: `/rewards/${rewardId}/trigger-target/${type}`
    }).then((response) => {
      return response
    })
  }

  extend (params: RequestExtendReward): Promise<Reward[]> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rewards/extend',
      params
    }).then((response) => {
      return response.data
    })
  }
}
