import { GroupedTransactionsResponse, RequestParams, Transaction, TransactionFilters, TransactionResponse, TransactionUnassignedItemsResponse } from '../../../../types'
import Resource from '../../resource'

export default class ProfileTransactions extends Resource {
  get (transactionID: number): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/transactions/${transactionID}`
    }).then((response) => {
      return response?.data
    })
  }

  list (params?: RequestParams): Promise<TransactionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transactions',
      params
    })
  }

  find (filter: { field: TransactionFilters, value: string }): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/find-transactions',
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

  getGrouped (params?: { pageSize?: number, pageNumber?: number }): Promise<GroupedTransactionsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/group_transactions',
      ...(params?.pageSize && { 'page[size]': params?.pageSize }),
      ...(params?.pageNumber && { 'page[number]': params?.pageNumber })
    })
  }

  getUnassignedItems (params?: { include_list_item: 1 | 0}): Promise<TransactionUnassignedItemsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transactionitems/list/unassigned',
      params
    }).then((response) => {
      return response.data
    })
  }
}
