import { RequestParams, TierProgress } from '../../../types'
import Resource from '../resource'

export default class ProfileTiers extends Resource {
  list (profileID: string, params?: RequestParams): Promise<TierProgress> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/tiers`,
      params
    }).then((response) => {
      return response.data
    })
  }

  calculate (id: string): Promise<TierProgress> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/tiers/calculate`
    }).then((response) => {
      return response.data
    })
  }

  assign (profileID: string, tierDefinitionHandle: string): Promise<TierProgress> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/tiers/assign`,
      body: {
        tier: tierDefinitionHandle
      }
    }).then((response) => {
      return response.data
    })
  }
}
