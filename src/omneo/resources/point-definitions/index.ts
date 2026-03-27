import { RequestParams, PointDefinition, PointDefinitionResponse, UpdatePointDefinitionInput, CreatePointDefinitionInput } from '@types'
import Resource from '../resource.js'

export default class PointDefinitions extends Resource {
  get (id: number, params?: RequestParams): Promise<PointDefinition> {
    return this.client.call({
      method: 'GET',
      endpoint: `/points/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<PointDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/points/definitions',
      params
    })
  }

  create (body: CreatePointDefinitionInput): Promise<PointDefinition> {
    return this.client.call({
      method: 'POST',
      endpoint: '/points/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdatePointDefinitionInput): Promise<PointDefinition> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/points/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/points/definitions/${id}`
    })
  }
}
