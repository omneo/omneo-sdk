import { RequestParams, Aggregations, UpdateAggregationInput } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAggregations extends Resource {
  list (id: string, params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/aggregations`,
      params
    }).then((response) => {
      return response.data
    })
  }

  calculate (id: string, params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/aggregations/calculate`,
      params
    }).then((response) => {
      return response.data
    })
  }

  update (profileId: string, body: UpdateAggregationInput) : Promise<Aggregations> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileId}/aggregations`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
