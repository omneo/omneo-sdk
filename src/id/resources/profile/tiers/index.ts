import { RequestParams, TierPointsResponse, TierProgress } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileTiers extends Resource {
  list (params?: RequestParams): Promise<TierProgress> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/tiers',
      params
    }).then((response) => {
      return response.data
    })
  }

  calculate (): Promise<TierProgress> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/tiers/calculate'
    }).then((response) => {
      return response.data
    })
  }

  assign (tierDefinitionHandle: string): Promise<TierProgress> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/tiers/assign',
      body: {
        tier: tierDefinitionHandle
      }
    }).then((response) => {
      return response.data
    })
  }

  points (params?: RequestParams): Promise<TierPointsResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/tiers/points',
      params
    }).then((response) => {
      return response
    })
  }
}
