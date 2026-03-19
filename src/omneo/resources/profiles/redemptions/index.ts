import { RequestParams, Redemption, RedemptionResponse, RedemptionType } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileRedemptions extends Resource {
  get (profileId: string, redemptionId: number): Promise<Redemption> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/redemptions/${redemptionId}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileId: string, params?: RequestParams): Promise<RedemptionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/redemptions`,
      params
    }).then((response) => {
      return response
    })
  }

  count (profileId: string, redemptionType: RedemptionType, id: number): Promise<{ count: number }> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/redemptions/${redemptionType}/${id}/count`
    }).then((response) => {
      return response.data
    })
  }
}
