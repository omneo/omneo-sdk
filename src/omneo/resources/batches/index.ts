import { RequestParams, BatchResponse, Batch } from '@types'
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
}
