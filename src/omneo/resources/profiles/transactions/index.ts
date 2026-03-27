import { GroupedTransactionsResponse, RequestParams, Transaction, TransactionAssignedItemsResponse, TransactionFilters, TransactionItem, TransactionResponse, TransactionUnassignedItemsResponse } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileTransactions extends Resource {
  get (profileID: string, transactionID: number): Promise<Transaction> {
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
      return response
    })
  }

  getAssignedItems (profileID: string, params?: { include_list_item: 1 | 0}): Promise<TransactionAssignedItemsResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/transactionitems/list/assigned`,
      params
    }).then((response) => {
      return response
    })
  }

  linkListItem (profileId: string, transactionItemId: number, profileListId: number): Promise<TransactionItem> {
    const body = {
      product_list_item_id: profileListId,
      type: 'link'
    }
    console.log('linkListItem body:', body)
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileId}/transactions/items/${transactionItemId}/list-item`,
      body
    }).then((response) => {
      console.log('linkListItem response:', response)
      return response.data
    }).catch((error) => {
      console.error('linkListItem error:', error)
      throw error
    })
  }

  unlinkListItem (profileId: string, transactionItemId: number, profileListId: number): Promise<TransactionItem> {
    const body = {
      product_list_item_id: profileListId,
      type: 'unlink'
    }
    const endpoint = `/profiles/${profileId}/transactions/items/${transactionItemId}/list-item`
    console.log('unlinkListItem body:', body)
    return this.client.call({
      method: 'POST',
      endpoint,
      body
    }).then((response) => {
      return response.data
    })
  }

  unattach (profileId: string, transactionId: number): Promise<Transaction> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/transactions/${transactionId}/unattach`
    }).then((response) => {
      return response.data
    })
  }
}
