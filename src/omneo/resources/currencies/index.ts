import { Currency, CurrencyResponse, RequestCreateCurrency, RequestQueryCurrency, RequestUpdateCurrency } from '@types'
import Resource from '../resource.js'

export default class Currencies extends Resource {
  list (params?: RequestQueryCurrency): Promise<CurrencyResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/currencies',
      params,
      flattenParams: true
    })
  }

  get (id: number): Promise<Currency> {
    return this.client.call({
      method: 'GET',
      endpoint: `/currencies/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateCurrency): Promise<Currency> {
    return this.client.call({
      method: 'POST',
      endpoint: '/currencies',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateCurrency): Promise<Currency> {
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
