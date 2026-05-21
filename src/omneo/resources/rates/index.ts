import { RequestCalculateRate, Rate, RateResponse, RequestParams } from '@types'
import Resource from '../resource.js'

export default class Rates extends Resource {
  list (params?: RequestParams): Promise<RateResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/rates',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<Rate> {
    return this.client.call({
      method: 'GET',
      endpoint: `/rates/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: Rate): Promise<Rate> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rates',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Rate): Promise<Rate> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/rates/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/rates/${id}`
    }).then((response) => {
      return response
    })
  }

  calculate (body: RequestCalculateRate): Promise<{total: number}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rates/calculate',
      body
    }).then((response) => {
      return response
    })
  }

  searchAttributes (attribute: string, params?: RequestParams): Promise<any[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/rates/searchAttributes/${attribute}`,
      params
    }).then((response) => {
      return response
    })
  }
}
