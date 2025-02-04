import { Brand, BrandInput, BrandResponse } from '../../../types/brands.js'
import { RequestParams } from '../../../types/omneo.js'
import Resource from '../resource.js'

export default class Brands extends Resource {
  get (id: number, params?: RequestParams): Promise<Brand> {
    return this.client.call({
      method: 'get',
      endpoint: `/brands/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<BrandResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/brands',
      params
    })
  }

  create (body: BrandInput): Promise<Brand> {
    return this.client.call({
      method: 'post',
      endpoint: '/brands',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<BrandInput>): Promise<Brand> {
    return this.client.call({
      method: 'put',
      endpoint: `/brands/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/brands/${id}`
    })
  }
}
