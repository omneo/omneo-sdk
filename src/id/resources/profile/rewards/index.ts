import { RequestParams, Reward, RewardResponse } from '../../../../types'
import Resource from '../../resource'

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
}
