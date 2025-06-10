import { Interaction, InteractionResponse, RequestParams } from '../../../../types'
import Resource from '../../resource'

export default class ProfileInteractions extends Resource {
  get (interactionID: number): Promise<Interaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/interactions/${interactionID}`
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

  delete (interactionID: number): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/interactions/${interactionID}`
    }).then((response) => {
      return response
    })
  }
}
