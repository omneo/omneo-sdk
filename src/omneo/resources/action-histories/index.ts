import { RequestParams, ActionHistoryResponse, ActionHistory } from '@types'
import Resource from '../resource.js'

export default class ActionHistories extends Resource {
  list (params?: RequestParams): Promise<ActionHistoryResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/action-history',
      params
    })
  }

  get (actionHistoryId: number): Promise<ActionHistory> {
    return this.client.call({
      method: 'GET',
      endpoint: `/action-history/${actionHistoryId}`
    }).then((response) => {
      return response.data
    })
  }
}
