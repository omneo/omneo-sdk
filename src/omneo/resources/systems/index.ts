import { RequestParams, System, SystemInput } from '../../../types'
import Resource from '../resource.js'

export default class Systems extends Resource {
  get (id: number, params?: RequestParams): Promise<System> {
    return this.client.call({
      method: 'get',
      endpoint: `/systems/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  // Non paginated response
  list (params?: RequestParams): Promise<System[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/systems',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: SystemInput): Promise<System> {
    return this.client.call({
      method: 'post',
      endpoint: '/systems',
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/systems/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
