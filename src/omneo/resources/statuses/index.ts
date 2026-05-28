import { RequestCreateStatus, RequestQueryStatus, RequestUpdateStatus, Status, StatusResponse } from '@types'
import Resource from '../resource.js'

export default class Statuses extends Resource {
  get (id: number): Promise<Status> {
    return this.client.call({
      method: 'get',
      endpoint: `/statuses/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryStatus): Promise<StatusResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/statuses',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateStatus): Promise<Status> {
    return this.client.call({
      method: 'post',
      endpoint: '/statuses',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateStatus): Promise<Status> {
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
