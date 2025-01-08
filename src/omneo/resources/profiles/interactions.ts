import { Interaction, InteractionInput, InteractionResponse, RequestParams } from '../../../types'
import Resource from '../resource'

export default class ProfileInteractions extends Resource {
  get (profileID: string, interactionID: string): Promise<Interaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/interaction/${interactionID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<InteractionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/interactions`,
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

  update (profileID: string, interactionID: string, body: InteractionInput): Promise<Interaction> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/interactions/${interactionID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, interactionID: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/interactions/${interactionID}`
    }).then((response) => {
      return response.data
    })
  }
}
