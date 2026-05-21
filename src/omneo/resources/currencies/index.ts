import { Currency, CurrencyResponse, RequestParams } from '@types'
import Resource from '../resource.js'

export default class Currencies extends Resource {
  list (params?: RequestParams): Promise<CurrencyResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/currencies',
      params
    })
  }

  get (id: number, params?: RequestParams): Promise<Currency> {
    return this.client.call({
      method: 'GET',
      endpoint: `/currencies/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: Currency): Promise<Currency> {
    return this.client.call({
      method: 'POST',
      endpoint: '/currencies',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Currency): Promise<Currency> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/currencies/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/currencies/${id}`
    }).then((response) => {
      return response
    })
  }
}
