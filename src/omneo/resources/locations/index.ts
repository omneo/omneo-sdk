import { Location, LocationResponse, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Locations extends Resource {
  get (id: number, params?: RequestParams): Promise<Location> {
    return this.client.call({
      method: 'get',
      endpoint: `/locations/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<LocationResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/locations',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: any): Promise<Location> {
    return this.client.call({
      method: 'post',
      endpoint: '/locations',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: any): Promise<Location> {
    return this.client.call({
      method: 'put',
      endpoint: `/locations/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/locations/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
