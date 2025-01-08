import { GroupedTransactionsResponse, RequestParams, Transaction, TransactionFilters, TransactionResponse, TransactionUnassignedItemsResponse } from '../../../types'
import Resource from '../resource'

export default class ProfileTransactions extends Resource {
  get (profileID: string, transactionID: string): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions/${transactionID}`
    })
  }

  list (profileID: string, params?: RequestParams): Promise<TransactionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions`,
      params
    }).then((response) => {
      return response.data
    })
  }

  find (profileID: string, filter: { field: TransactionFilters, value: string }): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/find-transactions`,
      params: {
        [`filter[${filter.field}]`]: filter.value
      }
    }).then((response) => {
      return response?.data
    }).catch((error) => {
      if (error?.response?.status === 404) return []
      return Promise.reject(error)
    })
  }

  getGrouped (profileID: string, params?: { pageSize?: number, pageNumber?: number }): Promise<GroupedTransactionsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/group_transactions`,
      ...(params?.pageSize && { 'page[size]': params?.pageSize }),
      ...(params?.pageNumber && { 'page[number]': params?.pageNumber })
    })
  }

  getUnassignedItems (profileID: string, params?: { include_list_item: 1 | 0}): Promise<TransactionUnassignedItemsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactionitems/list/unassigned`,
      params
    }).then((response) => {
      return response.data
    })
  }
}
