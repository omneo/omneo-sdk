import { RequestParams, Connection, ConnectionResponse, ConnectionInput, Profile } from '../../../../types'
import Resource from '../../resource'

export default class ProfileConnections extends Resource {
  get (profileID: string, connectionID: number): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<ConnectionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections`,
      params
    })
  }

  create (profileID: string, body: ConnectionInput): Promise<Connection> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/connections`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, connectionID: string, body: Partial<ConnectionInput>): Promise<Connection> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/connections/${connectionID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, connectionID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  getProfileInfo (profileID: string, connectionID: number): Promise<Partial<Profile>> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections/${connectionID}/profileInfo`
    }).then((response) => {
      return response.data
    })
  }
}
