import { RequestParams, Reward, RewardCreateInput, RewardResponse, RewardUpdateInput } from '../../../types'
import Resource from '../resource'

export default class ProfileRewards extends Resource {
  get (profileID: string, rewardID: number): Promise<Reward> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/rewards/${rewardID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<RewardResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/rewards`,
      params
    }).then((response) => {
      return response
    })
  }

  create (profileID: string, body: RewardCreateInput): Promise<Reward> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/rewards`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, rewardID: string, body: RewardUpdateInput): Promise<Reward> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/rewards/${rewardID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, rewardID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/rewards/${rewardID}`
    }).then((response) => {
      return response.data
    })
  }
}
