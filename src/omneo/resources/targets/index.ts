import { RequestParams, Target, TargetResponse } from '@types'
import Resource from '../resource.js'

export default class Targets extends Resource {
  get (id: number, params?: RequestParams): Promise<Target> {
    return this.client.call({
      method: 'get',
      endpoint: `/targets/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<TargetResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/targets',
      params
    })
  }

  create (body: Target): Promise<Target> {
    return this.client.call({
      method: 'post',
      endpoint: '/targets',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<Target>): Promise<Target> {
    return this.client.call({
      method: 'put',
      endpoint: `/targets/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/targets/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
