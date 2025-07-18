import { RequestParams, Reward, RewardResponse } from '../../../../types'
import Resource from '../../resource'

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
}
