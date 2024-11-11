import { Connection, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Connections extends Resource {
  get (id: number, params?: RequestParams): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/connections/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<Array<Connection>> {
    return this.client.call({
      method: 'get',
      endpoint: '/connections',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: Connection): Promise<Connection> {
    return this.client.call({
      method: 'post',
      endpoint: '/connections',
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
