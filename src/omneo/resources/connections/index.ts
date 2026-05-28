import { Connection, ConnectionResponse, RequestCreateConnection, RequestQueryConnection, RequestUpdateConnection } from '@types'
import Resource from '../resource.js'

export default class Connections extends Resource {
  get (id: number): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/connections/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryConnection): Promise<ConnectionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/connections',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateConnection): Promise<Connection> {
    return this.client.call({
      method: 'post',
      endpoint: '/connections',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateConnection): Promise<Connection> {
    return this.client.call({
      method: 'put',
      endpoint: `/connections/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/connections/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
