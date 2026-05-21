import { RedemptionItem, RedemptionItemResponse, RequestQueryRedemptionItem } from '@types'
import Resource from '../../resource.js'

export default class RedemptionItems extends Resource {
  list (params?: RequestQueryRedemptionItem): Promise<RedemptionItemResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/redemptions/items',
      params
    }).then((response) => {
      return response
    })
  }

  get (redemptionItemId: number): Promise<RedemptionItem> {
    return this.client.call({
      method: 'GET',
      endpoint: `/redemptions/items/${redemptionItemId}`
    }).then((response) => {
      return response.data
    })
  }
}
