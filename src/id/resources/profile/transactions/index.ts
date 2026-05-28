import { ProfileTransactionGroupResponse, RequestParams, Transaction, TransactionItemResponse, TransactionItem, TransactionResponse } from '@types'
import Resource from '@id/resources/resource'

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

  find (filter: { field: string, value: string }): Promise<Transaction> {
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

  getGrouped (params?: { pageSize?: number, pageNumber?: number }): Promise<ProfileTransactionGroupResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/group_transactions',
      ...(params?.pageSize && { 'page[size]': params?.pageSize }),
      ...(params?.pageNumber && { 'page[number]': params?.pageNumber })
    })
  }

  getUnassignedItems (params?: { include_list_item: 1 | 0}): Promise<TransactionItemResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transactionitems/list/unassigned',
      params
    }).then((response) => {
      return response
    })
  }

  getAssignedItems (params?: { include_list_item: 1 | 0}): Promise<TransactionItemResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/transactionitems/list/assigned',
      params
    }).then((response) => {
      return response
    })
  }

  linkListItem (transactionItemId: number, profileListId: number): Promise<TransactionItem> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/me/transactions/items/${transactionItemId}/list-item`,
      body: {
        product_list_item_id: profileListId,
        type: 'link'
      }
    }).then((response) => {
      return response.data
    })
  }

  unlinkListItem (transactionItemId: number, profileListId: number): Promise<TransactionItem> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/me/transactions/items/${transactionItemId}/list-item`,
      body: {
        product_list_item_id: profileListId,
        type: 'unlink'
      }
    }).then((response) => {
      return response.data
    })
  }

  unattach (transactionId: number): Promise<Transaction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/me/transactions/${transactionId}/unattach`
    }).then((response) => {
      return response.data
    })
  }
}
