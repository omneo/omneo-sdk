import { RequestCreateTransaction, RequestMockTransaction, RequestQueryTransaction, RequestTriggerTransactionEvent, RequestUpdateCreateTransaction, RequestUpdateTransaction, Transaction, TransactionIncentiveEstimateResponse, TransactionQueueCreateResponse, TransactionQueueResponse, TransactionResponse } from '@types'
import Resource from '../resource'
import TransactionCustomFields from './custom-fields'
import TransactionItems from './items'

export default class Transactions extends Resource {
  customFields = new TransactionCustomFields(this.client)
  items = new TransactionItems(this.client)

  list (params?: RequestQueryTransaction): Promise<TransactionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/transactions',
      params,
      flattenParams: true
    })
  }

  get (id: string): Promise<Transaction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  getByExternalID (externalID: string): Promise<Transaction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/external/${externalID}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateTransaction): Promise<Transaction> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: RequestUpdateTransaction): Promise<Transaction> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/transactions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  updateCreate (body: RequestUpdateCreateTransaction): Promise<Transaction> {
    if (body.receipt_is_email === null) delete (body as any).receipt_is_email // Omneo API bug cannot accept null
    if (body.is_void === null) delete (body as any).is_void // Omneo API bug cannot accept null

    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/update-create',
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<Transaction> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/transactions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  queue (body: RequestUpdateCreateTransaction): Promise<TransactionQueueResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/queue',
      body
    }).then((response) => {
      return response
    })
  }

  queueCreate (body: RequestCreateTransaction): Promise<TransactionQueueCreateResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/queue/create',
      body
    }).then((response) => {
      return response
    })
  }

  resend (id: string) {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/${id}/resend`
    }).then((response) => {
      return response.data
    })
  }

  eventTrigger (transactionId: string, body: RequestTriggerTransactionEvent) {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/${transactionId}/event-trigger`,
      body
    }).then((response) => {
      return response.data
    })
  }

  incentiveEstimate (body: RequestMockTransaction): Promise<TransactionIncentiveEstimateResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/incentive-estimate',
      body
    }).then((response) => {
      return response
    })
  }
}
