import { Brand, BrandResponse, RequestCreateBrand, RequestUpdateBrand, RequestQueryBrand } from '@types'
import Resource from '../resource.js'

export default class Brands extends Resource {
  get (id: number): Promise<Brand> {
    return this.client.call({
      method: 'get',
      endpoint: `/brands/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryBrand): Promise<BrandResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/brands',
      params
    })
  }

  create (body: RequestCreateBrand): Promise<Brand> {
    return this.client.call({
      method: 'post',
      endpoint: '/brands',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateBrand): Promise<Brand> {
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
