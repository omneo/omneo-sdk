import { Redemption, CreditResponse, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileCredits extends Resource {
  list (profileID: string, params?: RequestParams): Promise<CreditResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/credits`,
      params
    }).then((response) => {
      return response
    })
  }

  redeem (profileID: string, creditId: string, body: any): Promise<Redemption> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/credits/${creditId}/redeem`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
