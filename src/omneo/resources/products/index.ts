import { Product, ProductResponse, RequestParams } from '@types'
import Resource from '../resource'
import ProductVariants from './variants/index.js'

export default class Products extends Resource {
  variants = new ProductVariants(this.client)

  list (params?: RequestParams): Promise<ProductResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/products',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: string, params?: RequestParams): Promise<Product> {
    return this.client.call({
      method: 'GET',
      endpoint: `/products/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: Product): Promise<Product> {
    return this.client.call({
      method: 'POST',
      endpoint: '/products',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: Product): Promise<Product> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/products/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<any> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/products/${id}`
    }).then((response) => {
      return response
    })
  }

  queue (body: any): Promise<{data: string}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/products/queue',
      body
    }).then((response) => {
      return response.data
    })
  }

  createOrUpdate (body: Product): Promise<Product> {
    return this.client.call({
      method: 'POST',
      endpoint: '/products/create-update',
      body
    }).then((response) => {
      return response.data
    })
  }
}
