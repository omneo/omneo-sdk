import { RequestParams } from '../../../types'
import Resource from '../resource'

export default class Orders extends Resource {
  get (id: string, params: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: `/orders/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: '/orders',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: any): Promise<any> {
    return this.client.call({
      method: 'post',
      endpoint: '/orders',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: any): Promise<any> {
    return this.client.call({
      method: 'put',
      endpoint: `/orders/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/orders/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
