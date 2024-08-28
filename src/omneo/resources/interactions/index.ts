import { Interaction, RequestParams } from '../../../types'
import Resource from '../resource'

export default class Interactions extends Resource {
  get (id: string, params: RequestParams): Promise<Interaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/interactions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params: RequestParams): Promise<Interaction[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/interactions',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: any): Promise<Interaction> {
    return this.client.call({
      method: 'post',
      endpoint: '/interactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: any): Promise<Interaction> {
    return this.client.call({
      method: 'put',
      endpoint: `/interactions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/interactions/${id}`
    }).then(() => {
    })
  }
}
