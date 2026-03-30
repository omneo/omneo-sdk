
import { CreateProductVariantInput, ProductVariant, ProductVariantsResponse, RequestParams, UpdateProductVariantInput } from '@types'
import Resource from '../../resource.js'

export default class ProductVariants extends Resource {
  list (productID: string, params?: RequestParams): Promise<ProductVariantsResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/products/${productID}/variants`,
      params
    }).then((response) => {
      return response
    })
  }

  get (productID: string, variantID: string, params?: RequestParams): Promise<ProductVariant> {
    return this.client.call({
      method: 'GET',
      endpoint: `/products/${productID}/variants/${variantID}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (productID: string, body: CreateProductVariantInput): Promise<ProductVariant> {
    return this.client.call({
      method: 'POST',
      body,
      endpoint: `/products/${productID}/variants`
    }).then((response) => {
      return response.data
    })
  }

  update (productID: string, variantID: string, body: UpdateProductVariantInput): Promise<ProductVariant> {
    return this.client.call({
      method: 'PUT',
      body,
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response.data
    })
  }

  delete (productID: string, variantID: string): Promise<any> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response
    })
  }

  listVariants (params?: RequestParams): Promise<ProductVariantsResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/products/variants',
      params
    }).then((response) => {
      return response
    })
  }
}
