import { RequestParams, RoleDefinition, RoleDefinitionResponse } from '@types'
import Resource from '../resource.js'

export default class RoleDefinitions extends Resource {
  get (id: number): Promise<RoleDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/roles/definitions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<RoleDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/roles/definitions',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: RoleDefinition): Promise<RoleDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/roles/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RoleDefinition): Promise<RoleDefinition> {
    return this.client.call({
      method: 'put',
      endpoint: `/roles/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/roles/definitions/${id}`
    })
  }
}
