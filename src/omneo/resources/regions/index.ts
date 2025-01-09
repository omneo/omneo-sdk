import { RegionInput, RequestParams, Region, RegionResponse } from '../../../types'
import Resource from '../resource.js'

export default class Regions extends Resource {
  get (id: number, params?: RequestParams): Promise<Region> {
    return this.client.call({
      method: 'get',
      endpoint: `/regions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<RegionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/regions',
      params
    })
  }

  create (body: RegionInput): Promise<Region> {
    return this.client.call({
      method: 'post',
      endpoint: '/regions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RegionInput): Promise<Region> {
    return this.client.call({
      method: 'put',
      endpoint: `/regions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/regions/${id}`
    })
  }
}
