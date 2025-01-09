import { RequestParams, Connection, ConnectionResponse, ConnectionInput, Profile } from '../../../types'
import Resource from '../resource'

export default class ProfileConnections extends Resource {
  get (connectionID: number): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<ConnectionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/connections',
      params
    })
  }

  create (body: ConnectionInput): Promise<Connection> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/connections',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (connectionID: string, body: Partial<ConnectionInput>): Promise<Connection> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/connections/${connectionID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (connectionID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  getProfileInfo (connectionID: number): Promise<Partial<Profile>> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/connections/${connectionID}/profileInfo`
    }).then((response) => {
      return response.data
    })
  }
}
