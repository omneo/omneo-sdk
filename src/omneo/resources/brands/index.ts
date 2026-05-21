import { RequestParams, Brand, BrandResponse } from '@types'
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

  create (body: Brand): Promise<Brand> {
    return this.client.call({
      method: 'post',
      endpoint: '/brands',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<Brand>): Promise<Brand> {
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
