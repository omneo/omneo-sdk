import { CountryInput, RequestParams, Country, CountryResponse } from '../../../types'
import Resource from '../resource.js'

export default class Rewards extends Resource {
  get (id: string, params?: RequestParams): Promise<Country> {
    return this.client.call({
      method: 'get',
      endpoint: `/countries/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<CountryResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/countries',
      params
    })
  }

  create (body: CountryInput): Promise<Country> {
    return this.client.call({
      method: 'post',
      endpoint: '/countries',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: CountryInput): Promise<Country> {
    return this.client.call({
      method: 'put',
      endpoint: `/countries/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/countries/${id}`
    })
  }
}
