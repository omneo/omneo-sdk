import { Interaction, InteractionInput, InteractionResponse, RequestParams } from '../../../../types'
import Resource from '../../resource'

export default class ProfileInteractions extends Resource {
  get (interactionID: string): Promise<Interaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/interaction/${interactionID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<InteractionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/interactions',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: InteractionInput): Promise<Interaction> {
    return this.client.call({
      method: 'post',
      endpoint: '/interactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (interactionID: string, body: InteractionInput): Promise<Interaction> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/interactions/${interactionID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (interactionID: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/interactions/${interactionID}`
    }).then((response) => {
      return response.data
    })
  }
}
