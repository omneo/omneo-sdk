import { RequestParams, Connection, ConnectionResponse, ConnectionInput, Profile } from '../../../../types'
import Resource from '../../resource'

export default class ProfileConnections extends Resource {
  list (params?: RequestParams): Promise<ConnectionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/connections',
      params
    })
  }

  update (connectionID: number, body: Partial<ConnectionInput>): Promise<Connection> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/connections/${connectionID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  getProfileInfo (connectionID: number): Promise<Partial<Profile>> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/connections/${connectionID}/profileInfo`
    }).then((response) => {
      return response
    })
  }
}
