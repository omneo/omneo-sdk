import { RequestParams, ProfileAggregation, RequestUpdateProfileAggregation } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAggregations extends Resource {
  list (id: string, params?: RequestParams): Promise<ProfileAggregation> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/aggregations`,
      params
    }).then((response) => {
      return response.data
    })
  }

  calculate (id: string, params?: RequestParams): Promise<ProfileAggregation> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/aggregations/calculate`,
      params
    }).then((response) => {
      return response.data
    })
  }

  update (profileId: string, body: RequestUpdateProfileAggregation) : Promise<ProfileAggregation> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileId}/aggregations`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
