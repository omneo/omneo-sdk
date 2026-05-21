import { RequestCreateTarget, RequestQueryTarget, RequestUpdateTarget, Target, TargetResponse } from '@types'
import Resource from '../resource.js'

export default class Targets extends Resource {
  get (id: number): Promise<Target> {
    return this.client.call({
      method: 'get',
      endpoint: `/targets/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryTarget): Promise<TargetResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/targets',
      params
    })
  }

  create (body: RequestCreateTarget): Promise<Target> {
    return this.client.call({
      method: 'post',
      endpoint: '/targets',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateTarget): Promise<Target> {
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
