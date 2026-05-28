import { ActionHistoryResponse, ActionHistory, RequestQueryActionHistory } from '@types'
import Resource from '../resource.js'

export default class ActionHistories extends Resource {
  list (params?: RequestQueryActionHistory): Promise<ActionHistoryResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/action-history',
      params,
      flattenParams: true
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
