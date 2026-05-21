import { RequestParams, Credit, RequestExtendCredit, CreditResponse } from '@types'
import Resource from '../resource.js'

export default class Credits extends Resource {
  get (id: number, params?: RequestParams): Promise<Credit> {
    return this.client.call({
      method: 'get',
      endpoint: `/credits/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<CreditResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/credits',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: Credit): Promise<Credit> {
    return this.client.call({
      method: 'post',
      endpoint: '/credits',
      body
    }).then((response) => {
      return response.data
    })
  }

  extend (body: RequestExtendCredit): Promise<CreditResponse> {
    return this.client.call({
      method: 'post',
      endpoint: '/credits/extend',
      body
    }).then((response) => {
      return response
    })
  }

  update (id: number, body: Credit): Promise<Credit> {
    return this.client.call({
      method: 'put',
      endpoint: `/credits/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/credits/${id}`
    }).then((response) => {
      return response
    })
  }
}
