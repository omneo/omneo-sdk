import { RequestCreateTierPoint, RequestQueryTierPoint, TierPoint, TierPointResponse } from '@types'
import Resource from '../resource.js'

export default class TierPoints extends Resource {
  get (id: number): Promise<TierPoint> {
    return this.client.call({
      method: 'GET',
      endpoint: `/tiers/points/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryTierPoint): Promise<TierPointResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/tiers/points',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateTierPoint): Promise<TierPoint> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tiers/points',
      body
    }).then((response) => {
      return response.data
    })
  }
}
