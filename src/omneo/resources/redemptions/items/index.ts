import { Redemptionitem, RedemptionItemResponse, RequestParams } from '@types'
import Resource from '../../resource.js'

export default class RedemptionItems extends Resource {
  list (params?: RequestParams): Promise<RedemptionItemResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/redemptions/items',
      params
    }).then((response) => {
      return response
    })
  }

  get (redemptionItemId: number): Promise<Redemptionitem> {
    return this.client.call({
      method: 'GET',
      endpoint: `/redemptions/items/${redemptionItemId}`
    }).then((response) => {
      return response.data
    })
  }
}
