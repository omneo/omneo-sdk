import { Region, RequestCreateRegion, RequestQueryRegion, RegionResponse, RequestUpdateRegion } from '@types'
import Resource from '../resource.js'

export default class Regions extends Resource {
  get (id: number): Promise<Region> {
    return this.client.call({
      method: 'get',
      endpoint: `/regions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryRegion): Promise<RegionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/regions',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateRegion): Promise<Region> {
    return this.client.call({
      method: 'post',
      endpoint: '/regions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateRegion): Promise<Region> {
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
