import { RequestParams, ConnectionDefinitionResponse, CreateConnectionDefinitionInput, UpdateConnectionDefinitionInput, ConnectionDefinition } from '@types'
import Resource from '../resource.js'

export default class ConnectionDefinitions extends Resource {
  list (params?: RequestParams): Promise<ConnectionDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/connection/definitions',
      params
    })
  }

  get (id: number, params?: RequestParams): Promise<ConnectionDefinition> {
    return this.client.call({
      method: 'GET',
      endpoint: `/connection/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateConnectionDefinitionInput): Promise<ConnectionDefinition> {
    return this.client.call({
      method: 'POST',
      endpoint: '/connection/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateConnectionDefinitionInput): Promise<ConnectionDefinition> {
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
