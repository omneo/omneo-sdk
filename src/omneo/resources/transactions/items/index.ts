import { RequestCreateTransactionItem, RequestQueryTransactionItem, TransactionItem, TransactionItemResponse } from '@types'
import Resource from '../../resource.js'

export default class TransactionItems extends Resource {
  list (params?: RequestQueryTransactionItem): Promise<TransactionItemResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/transactions/:transactionsId/items',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  get (transactionId: number, itemId: number): Promise<TransactionItem> {
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/${transactionId}/items/${itemId}`
    }).then((response) => {
      return response.data
    })
  }

  create (transactionId: number, body: RequestCreateTransactionItem): Promise<TransactionItem> {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/${transactionId}/items`,
      body
    }).then((response) => {
      return response.data
    })
  }

  recalculate (transactionItemId: number): Promise<void> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/transactions/items/${transactionItemId}`
    }).then((response) => {
      return response.data
    })
  }

  delete (transactionId: number, itemId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/transactions/${transactionId}/items/${itemId}`
    }).then((response) => {
      return response
    })
  }

  resend (itemId: string) {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/items/${itemId}/resend`
    }).then((response) => {
      return response.data
    })
  }

  linkListItem (transactionItemId: number): Promise<TransactionItem> {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/items/${transactionItemId}/list-item`
    }).then((response) => {
      return response.data
    })
  }
}
