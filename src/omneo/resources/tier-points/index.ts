import { RequestParams, TierPoint, TierPointsResponse, CreateTierPointInput } from '@types'
import Resource from '../resource.js'

export default class TierPoints extends Resource {
  get (id: number, params?: RequestParams): Promise<TierPoint> {
    return this.client.call({
      method: 'GET',
      endpoint: `/tiers/points/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<TierPointsResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/tiers/points',
      params
    })
  }

  create (body: CreateTierPointInput): Promise<TierPoint> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tiers/points',
      body
    }).then((response) => {
      return response.data
    })
  }
}
