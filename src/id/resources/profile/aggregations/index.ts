import { RequestParams, Aggregations } from '../../../../types'
import Resource from '../../resource'

export default class ProfileAggregations extends Resource {
  list (params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/aggregations',
      params
    }).then((response) => {
      return response.data
    })
  }

  calculate (params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/aggregations/calculate',
      params
    }).then((response) => {
      return response.data
    })
  }
}
