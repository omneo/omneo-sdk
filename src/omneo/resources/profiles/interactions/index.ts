import { Interaction, InteractionResponse, RequestParams } from '../../../../types'
import Resource from '../../resource'

export default class ProfileInteractions extends Resource {
  get (profileID: string, interactionID: number): Promise<Interaction> {
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

  delete (profileID: string, interactionID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/interactions/${interactionID}`
    }).then((response) => {
      return response.data
    })
  }
}
