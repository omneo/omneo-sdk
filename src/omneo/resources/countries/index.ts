import { Country, CountryResponse, RequestCreateCountry, RequestUpdateCountry, RequestQueryCountry } from '@types'
import Resource from '../resource.js'

export default class Countries extends Resource {
  get (id: number): Promise<Country> {
    return this.client.call({
      method: 'get',
      endpoint: `/countries/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryCountry): Promise<CountryResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/countries',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateCountry): Promise<Country> {
    return this.client.call({
      method: 'post',
      endpoint: '/countries',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateCountry): Promise<Country> {
    return this.client.call({
      method: 'put',
      endpoint: `/countries/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/countries/${id}`
    })
  }
}
