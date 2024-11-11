import { RequestParams, Transaction } from '../../../types'
import Resource from '../resource'

export default class Transactions extends Resource {
  get (id: string, params: RequestParams): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/transactions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getByExternalID (externalID: string, params: RequestParams): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/transactions/external/${externalID}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: any): Promise<Transaction> {
    return this.client.call({
      method: 'post',
      endpoint: '/transactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<Transaction> {
    return this.client.call({
      method: 'delete',
      endpoint: `/transactions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params: RequestParams): Promise<{data: Array<Transaction>, links: any, meta: any}> {
    return this.client.call({
      method: 'get',
      endpoint: '/transactions',
      params
    }).then((response: any) => {
      return response
    })
  }

  update (id: string, body: any): Promise<Transaction> {
    return this.client.call({
      method: 'put',
      endpoint: `/transactions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  queue (body: any): Promise<{data: string}> {
    return this.client.call({
      method: 'post',
      endpoint: '/transactions/queue',
      body
    }).then((response) => {
      return response.data
    })
  }

  resend (id: string) {
    return this.client.call({
      method: 'post',
      endpoint: `/transactions/${id}resend`
    }).then((response) => {
      return response.data
    })
  }

  resendItem (transactionItemID: string) {
    return this.client.call({
      method: 'post',
      endpoint: `transactions/items/${transactionItemID}/resend`
    }).then((response) => {
      return response.data
    })
  }
}
