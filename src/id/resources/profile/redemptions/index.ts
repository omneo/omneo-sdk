import { Redemption, RequestParams, RedemptionResponse, RedemptionItemTypeEnum } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileRedemptions extends Resource {
  get (redemptionId: number): Promise<Redemption> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/me/redemptions/${redemptionId}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<RedemptionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/redemptions',
      params
    }).then((response) => {
      return response
    })
  }

  count (redemptionType: RedemptionItemTypeEnum, id: number): Promise<{ count: number }> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/me/redemptions/${redemptionType}/${id}/count`
    }).then((response) => {
      return response.data
    })
  }
}
