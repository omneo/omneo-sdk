import { RequestParams, ProfileAggregation } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAggregations extends Resource {
  list (params?: RequestParams): Promise<ProfileAggregation> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/aggregations',
      params
    }).then((response) => {
      return response.data
    })
  }

  calculate (params?: RequestParams): Promise<ProfileAggregation> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/aggregations/calculate',
      params
    }).then((response) => {
      return response.data
    })
  }
}
