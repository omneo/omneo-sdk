import { CreateCustomProductInput, CustomProduct, CustomProductResponse, RequestParams, UpdateCustomProductInput } from '@types'
import Resource from '../resource.js'

export default class CustomProducts extends Resource {
  list (params?: RequestParams): Promise<CustomProductResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/customProducts',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<CustomProduct> {
    return this.client.call({
      method: 'GET',
      endpoint: `/customProducts/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateCustomProductInput): Promise<CustomProduct> {
    return this.client.call({
      method: 'POST',
      endpoint: '/customProducts',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateCustomProductInput): Promise<CustomProduct> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/customProducts/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/customProducts/${id}`
    }).then((response) => {
      return response
    })
  }
}
