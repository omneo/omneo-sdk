import { CreditResponse, Redemption, RequestParams } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileCredits extends Resource {
  list (params?: RequestParams): Promise<CreditResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/credits',
      params
    }).then((response) => {
      return response
    })
  }

  redeem (creditId: string, body: any): Promise<Redemption> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/credits/${creditId}/redeem`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
