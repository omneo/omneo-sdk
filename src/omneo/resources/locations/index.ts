import { Location, LocationResponse, RequestCreateLocation, RequestQueryLocation, RequestUpdateLocation } from '@types'
import Resource from '../resource.js'
import LocationCustomFields from './custom-fields/index.js'

export default class Locations extends Resource {
  customFields = new LocationCustomFields(this.client)

  get (id: number): Promise<Location> {
    return this.client.call({
      method: 'get',
      endpoint: `/locations/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryLocation): Promise<LocationResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/locations',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateLocation): Promise<Location> {
    return this.client.call({
      method: 'post',
      endpoint: '/locations',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateLocation): Promise<Location> {
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

  getByType (idType: string, id: number): Promise<Location> {
    return this.client.call({
      method: 'GET',
      endpoint: `/locations/${idType}/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
