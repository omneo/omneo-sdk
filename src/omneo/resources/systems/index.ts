import { RequestCreateSystem, RequestQuerySystem, System, SystemResponse } from '@types'
import Resource from '../resource.js'

export default class Systems extends Resource {
  get (id: number): Promise<System> {
    return this.client.call({
      method: 'get',
      endpoint: `/systems/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQuerySystem): Promise<SystemResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/systems',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateSystem): Promise<System> {
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
