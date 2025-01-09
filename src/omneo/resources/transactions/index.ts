import { RequestParams, Transaction, TransactionInput, TransactionResponse } from '../../../types'
import Resource from '../resource'

export default class Transactions extends Resource {
  get (id: string, params?: RequestParams): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/transactions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getByExternalID (externalID: string, params?: RequestParams): Promise<Transaction> {
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

  update (id: string, body: any): Promise<Transaction> {
    return this.client.call({
      method: 'put',
      endpoint: `/transactions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  updateCreate (body: TransactionInput): Promise<Transaction> {
    if (body.receipt_is_email === null) delete body.receipt_is_email // Omneo API bug cannot accept null
    if (body.is_void === null) delete body.is_void // Omneo API bug cannot accept null

    return this.client.call({
      method: 'post',
      endpoint: '/transactions/update-create',
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

  list (params?: RequestParams): Promise<TransactionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/transactions',
      params
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
