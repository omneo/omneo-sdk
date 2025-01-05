import { RequestParams, Status, StatusInput, StatusResponse } from '../../../types'
import Resource from '../resource.js'

export default class Statuses extends Resource {
  get (id: number, params?: RequestParams): Promise<Status> {
    return this.client.call({
      method: 'get',
      endpoint: `/statuses/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<StatusResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/statuses',
      params
    })
  }

  create (body: StatusInput): Promise<Status> {
    return this.client.call({
      method: 'post',
      endpoint: '/statuses',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<Status>): Promise<Status> {
    return this.client.call({
      method: 'put',
      endpoint: `/statuses/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/statuses/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
