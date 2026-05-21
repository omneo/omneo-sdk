import { RequestParams, BatchResponse, Batch, BatchItem } from '@types'
import Resource from '../resource.js'

export default class Batches extends Resource {
  list (params?: RequestParams): Promise<BatchResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/batches',
      params
    })
  }

  get (batchId: number): Promise<Batch> {
    return this.client.call({
      method: 'GET',
      endpoint: `/batches/${batchId}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: Batch): Promise<BatchResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: '/batches',
      body
    }).then((response) => {
      return response.data
    })
  }

  createItem (batchId: number, body: BatchItem): Promise<Batch> {
    return this.client.call({
      method: 'POST',
      endpoint: `/batches/${batchId}/items`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
