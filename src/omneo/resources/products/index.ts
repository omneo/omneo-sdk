import { Product, ProductVariant, ProductResponse, ProductVariantsResponse, RequestParams } from '@types'
import Resource from '../resource'

export default class Products extends Resource {
  get (id: string, params?: RequestParams): Promise<Product> {
    return this.client.call({
      method: 'get',
      endpoint: `/products/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getProductVariant (productID: string, variantID: string, params?: RequestParams): Promise<ProductVariant> {
    return this.client.call({
      method: 'get',
      endpoint: `/products/${productID}/variants/${variantID}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  deleteProductVariant (productID: string, variantID: string): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response
    })
  }

  updateProductVariant (productID: string, variantID: string, body: any): Promise<ProductVariant> {
    return this.client.call({
      method: 'put',
      body,
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response.data
    })
  }

  listProductVariants (productID: string, params?: RequestParams): Promise<ProductVariantsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/products/${productID}/variants`,
      params
    }).then((response) => {
      return response
    })
  }

  listVariants (params?: RequestParams): Promise<ProductVariantsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/products/variants',
      params
    }).then((response) => {
      return response
    })
  }

  update (id: string, body: any): Promise<Product> {
    return this.client.call({
      method: 'put',
      endpoint: `/products/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/products/${id}`
    }).then((response) => {
      return response
    })
  }

  list (params?: RequestParams): Promise<ProductResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/products',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: any): Promise<Product> {
    return this.client.call({
      method: 'post',
      endpoint: '/products',
      body
    }).then((response) => {
      return response.data
    })
  }

  queue (body: any): Promise<{data: string}> {
    return this.client.call({
      method: 'post',
      endpoint: '/products/queue',
      body
    }).then((response) => {
      return response.data
    })
  }
}
