import { Product, ProductResponse, RequestCreateOrUpdateProduct, RequestCreateOrUpdateProductQueue, RequestCreateProduct, RequestQueryProduct, RequestUpdateProduct } from '@types'
import Resource from '../resource'
import ProductVariants from './variants/index.js'

export default class Products extends Resource {
  variants = new ProductVariants(this.client)

  list (params?: RequestQueryProduct): Promise<ProductResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/products',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  get (id: string): Promise<Product> {
    return this.client.call({
      method: 'GET',
      endpoint: `/products/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateProduct): Promise<Product> {
    return this.client.call({
      method: 'POST',
      endpoint: '/products',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: RequestUpdateProduct): Promise<Product> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/products/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/products/${id}`
    }).then((response) => {
      return response
    })
  }

  queue (body: RequestCreateOrUpdateProductQueue): Promise<{data: string}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/products/queue',
      body
    }).then((response) => {
      return response.data
    })
  }

  createOrUpdate (body: RequestCreateOrUpdateProduct): Promise<Product> {
    return this.client.call({
      method: 'POST',
      endpoint: '/products/create-update',
      body
    }).then((response) => {
      return response.data
    })
  }
}
