import { RequestParams, Transaction, CreateTransactionInput, UpdateTransactionInput, TransactionResponse, TriggerTransactionEventInput, MockTransactionInput } from '@types'
import Resource from '../resource'
import TransactionCustomFields from './custom-fields'
import TransactionItems from './items'

export default class Transactions extends Resource {
  customFields = new TransactionCustomFields(this.client)
  items = new TransactionItems(this.client)

  list (params?: RequestParams): Promise<TransactionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/transactions',
      params
    })
  }

  get (id: string, params?: RequestParams): Promise<Transaction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getByExternalID (externalID: string, params?: RequestParams): Promise<Transaction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/external/${externalID}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateTransactionInput): Promise<Transaction> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: UpdateTransactionInput): Promise<Transaction> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/transactions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  updateCreate (body: CreateTransactionInput): Promise<Transaction> {
    if (body.receipt_is_email === null) delete body.receipt_is_email // Omneo API bug cannot accept null
    if (body.is_void === null) delete body.is_void // Omneo API bug cannot accept null

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

  queue (body: any): Promise<{data: string}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/queue',
      body
    }).then((response) => {
      return response.data
    })
  }

  queueCreate (body: CreateTransactionInput): Promise<{data: string}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/queue/create',
      body
    }).then((response) => {
      return response.data
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

  eventTrigger (transactionId: string, body: TriggerTransactionEventInput) {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/${transactionId}/event-trigger`,
      body
    }).then((response) => {
      return response.data
    })
  }

  incentiveEstimate (body: MockTransactionInput): Promise<{data: any}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/transactions/incentive-estimate',
      body
    }).then((response) => {
      return response.data
    })
  }
}
