import { ProductResponse, RequestParams } from '../../../types'
import Resource from '../resource'

export default class Products extends Resource {
  get (id: string, params?: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: `/products/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getProductVariant (productID: string, variantID: string, params?: RequestParams) {
    return this.client.call({
      method: 'get',
      endpoint: `/products/${productID}/variants/${variantID}`,
      params
    })
  }

  deleteProductVariant (productID: string, variantID: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/products/${productID}/variants/${variantID}`
    })
  }

  updateProductVariant (productID: string, variantID: string, body: any) {
    return this.client.call({
      method: 'put',
      body,
      endpoint: `/products/${productID}/variants/${variantID}`
    })
  }

  listProductVariants (productID: string, params?: RequestParams) {
    return this.client.call({
      method: 'get',
      endpoint: `/products/${productID}/variants`,
      params
    })
  }

  listVariants (params?: RequestParams) {
    return this.client.call({
      method: 'get',
      endpoint: '/products/variants',
      params
    })
  }

  update (id: string, body: any): Promise<any> {
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
      return response.data
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

  create (body: any): Promise<any> {
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
