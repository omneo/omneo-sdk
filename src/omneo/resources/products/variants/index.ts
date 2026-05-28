
import { ProductVariant, ProductVariantResponse, RequestCreateProductVariant, RequestQueryProductVariant, RequestUpdateProductVariant } from '@types'
import Resource from '../../resource.js'

export default class ProductVariants extends Resource {
  list (productID: string, params?: RequestQueryProductVariant): Promise<ProductVariantResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/products/${productID}/variants`,
      params
    }).then((response) => {
      return response
    })
  }

  get (productID: string, variantID: string): Promise<ProductVariant> {
    return this.client.call({
      method: 'GET',
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response.data
    })
  }

  create (productID: string, body: RequestCreateProductVariant): Promise<ProductVariant> {
    return this.client.call({
      method: 'POST',
      body,
      endpoint: `/products/${productID}/variants`
    }).then((response) => {
      return response.data
    })
  }

  update (productID: string, variantID: string, body: RequestUpdateProductVariant): Promise<ProductVariant> {
    return this.client.call({
      method: 'PUT',
      body,
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response.data
    })
  }

  delete (productID: string, variantID: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/products/${productID}/variants/${variantID}`
    }).then((response) => {
      return response
    })
  }

  listVariants (params?: RequestQueryProductVariant): Promise<ProductVariantResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/products/variants',
      params
    }).then((response) => {
      return response
    })
  }
}
