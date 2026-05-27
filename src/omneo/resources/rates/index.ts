import { Rate, RateCalculateResponse, RateResponse, RateSearchAttributesResponse, RequestCalculateRate, RequestCreateRate, RequestQueryRate, RequestUpdateRate } from '@types'
import Resource from '../resource.js'

export default class Rates extends Resource {
  list (params?: RequestQueryRate): Promise<RateResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/rates',
      params,
      flattenParams: true
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

  create (body: RequestCreateRate): Promise<Rate> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rates',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateRate): Promise<Rate> {
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

  calculate (body: RequestCalculateRate): Promise<RateCalculateResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rates/calculate',
      body
    }).then((response) => {
      return response
    })
  }

  searchAttributes (attribute: string, params?: RequestQueryRate): Promise<RateSearchAttributesResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/rates/searchAttributes/${attribute}`,
      params
    }).then((response) => {
      return response
    })
  }
}
