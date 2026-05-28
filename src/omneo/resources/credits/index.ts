import { Credit, RequestExtendCredit, CreditResponse, RequestCreateCredit, RequestUpdateCredit, RequestQueryCredit } from '@types'
import Resource from '../resource.js'

export default class Credits extends Resource {
  get (id: number): Promise<Credit> {
    return this.client.call({
      method: 'get',
      endpoint: `/credits/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryCredit): Promise<CreditResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/credits',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateCredit): Promise<Credit> {
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

  update (id: number, body: RequestUpdateCredit): Promise<Credit> {
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
