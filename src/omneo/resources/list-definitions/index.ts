import { RequestParams, ListDefinition, RequestCreateProductList, ListDefinitionResponse } from '@types'
import Resource from '../resource.js'

export default class ListDefinitions extends Resource {
  get (id: number, params?: RequestParams): Promise<ListDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/lists/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<ListDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/lists/definitions',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateProductList): Promise<ListDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/lists/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<RequestCreateProductList>): Promise<ListDefinition> {
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
