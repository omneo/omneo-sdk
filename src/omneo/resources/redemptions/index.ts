import { Redemption, RedemptionGroupByResponse, RedemptionResponse, RequestQueryRedemption, SuccessfulRedemption } from '@types'
import Resource from '../resource'
import RedemptionItems from './items'

export default class Redemptions extends Resource {
  items = new RedemptionItems(this.client)

  list (params: RequestQueryRedemption): Promise<RedemptionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/redemptions',
      params
    }).then((response) => {
      return response
    })
  }

  get (redemptionId: number): Promise<Redemption> {
    return this.client.call({
      method: 'GET',
      endpoint: `/redemptions/${redemptionId}`
    }).then((response) => {
      return response.data
    })
  }

  return (redemptionId: number): Promise<SuccessfulRedemption> {
    return this.client.call({
      method: 'POST',
      endpoint: `/redemptions/${redemptionId}/return`
    }).then((response) => {
      return response.data
    })
  }

  reversal (redemptionId: number): Promise<SuccessfulRedemption> {
    return this.client.call({
      method: 'POST',
      endpoint: `/redemptions/${redemptionId}/reversal`
    }).then((response) => {
      return response.data
    })
  }

  benefitReturn (redemptionId: number): Promise<Redemption> {
    return this.client.call({
      method: 'POST',
      endpoint: `/redemptions/${redemptionId}/benefit/return`
    }).then((response) => {
      return response.data
    })
  }

  groupBy (attribute: string): Promise<RedemptionGroupByResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/redemptions/group/${attribute}`
    }).then((response) => {
      return response.data
    })
  }
}
