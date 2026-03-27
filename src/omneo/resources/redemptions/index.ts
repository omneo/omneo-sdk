import { Redemption, SuccessfulRedemption } from '@types'
import Resource from '../resource'

export default class Redemptions extends Resource {
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

  groupBy (attribute: string): Promise<any> {
    return this.client.call({
      method: 'GET',
      endpoint: `/redemptions/group/${attribute}`
    }).then((response) => {
      return response.data
    })
  }
}
