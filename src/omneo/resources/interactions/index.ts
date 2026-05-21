import { Interaction, InteractionResponse, RequestCreateInteraction, RequestQueryInteraction, RequestUpdateInteraction } from '@types'
import Resource from '../resource'

export default class Interactions extends Resource {
  get (id: string): Promise<Interaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/interactions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryInteraction): Promise<InteractionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/interactions',
      params
    })
  }

  create (body: RequestCreateInteraction): Promise<Interaction> {
    return this.client.call({
      method: 'post',
      endpoint: '/interactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: RequestUpdateInteraction): Promise<Interaction> {
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
