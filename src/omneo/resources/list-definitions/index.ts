import { ListDefinition, ListDefinitionResponse, RequestQueryListDefinition, RequestCreateListDefinition, RequestUpdateListDefinition } from '@types'
import Resource from '../resource.js'

export default class ListDefinitions extends Resource {
  get (id: number): Promise<ListDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/lists/definitions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryListDefinition): Promise<ListDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/lists/definitions',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateListDefinition): Promise<ListDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/lists/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateListDefinition): Promise<ListDefinition> {
    return this.client.call({
      method: 'put',
      endpoint: `/lists/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/lists/definitions/${id}`
    }).then((response) => {
      return response
    })
  }
}
