import { CalculateRateInput, CreateRateInput, Rate, RateResponse, RequestParams, SearchRateAttribute, UpdateRateInput } from '@types'
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

  create (body: CreateRateInput): Promise<Rate> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rates',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateRateInput): Promise<Rate> {
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

  calculate (body: CalculateRateInput): Promise<{total: number}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/rates/calculate',
      body
    }).then((response) => {
      return response
    })
  }

  searchAttributes (attribute: string, params?: RequestParams): Promise<SearchRateAttribute[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/rates/searchAttributes/${attribute}`,
      params
    }).then((response) => {
      return response
    })
  }
}
