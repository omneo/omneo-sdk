import { ConnectionDefinitionResponse, RequestCreateConnectionDefinition, RequestUpdateConnectionDefinition, ConnectionDefinition, RequestQueryConnectionDefinition } from '@types'
import Resource from '../resource.js'

export default class ConnectionDefinitions extends Resource {
  list (params?: RequestQueryConnectionDefinition): Promise<ConnectionDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/connection/definitions',
      params
    })
  }

  get (id: number): Promise<ConnectionDefinition> {
    return this.client.call({
      method: 'GET',
      endpoint: `/connection/definitions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateConnectionDefinition): Promise<ConnectionDefinition> {
    return this.client.call({
      method: 'POST',
      endpoint: '/connection/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateConnectionDefinition): Promise<ConnectionDefinition> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/connection/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/connection/definitions/${id}`
    })
  }
}
