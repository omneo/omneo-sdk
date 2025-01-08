import { RequestParams, Reward, RewardCreateInput, RewardResponse, RewardUpdateInput } from '../../../types'
import Resource from '../resource'

export default class ProfileRewards extends Resource {
  get (rewardID: number): Promise<Reward> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/rewards/${rewardID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<RewardResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/rewards',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: RewardCreateInput): Promise<Reward> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/rewards',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (rewardID: string, body: RewardUpdateInput): Promise<Reward> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/rewards/${rewardID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (rewardID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/rewards/${rewardID}`
    }).then((response) => {
      return response.data
    })
  }
}
