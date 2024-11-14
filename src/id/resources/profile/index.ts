import { Aggregations, CustomAttribute, GroupedTransactionsResponse, IdentityRequest, OrderLedger, ProfileAppearance, ProfileBalances, ProfileComms, Region, RequestParams, Reward, Tier, TierProgress, Transaction, TransactionFilters, TransactionLedger } from '../../../types'
import IDResource from '../resource'

export default class Profile extends IDResource {
  me () {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me'
    })
  }

  purge () {
    return this.client.call({
      method: 'delete',
      endpoint: '/profiles/me/purge'
    })
  }

  getAggregations (params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/aggregations',
      params
    }).then((response) => {
      return response.data
    })
  }

  calculateAggregations (params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/aggregations/calculate',
      params
    }).then((response) => {
      return response.data
    })
  }

  getBalances (params?: object): Promise<ProfileBalances> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/balances',
      params
    }).then((response) => {
      return response.data
    })
  }

  findTransactions (filter: { field: TransactionFilters, value: string }) {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/find-transactions',
      params: {
        [`filter[${filter.field}]`]: filter.value
      }
    }).then((response) => {
      return response?.data
    }).catch((error) => {
      if (error?.response?.status === 404) return null
      return error
    })
  }

  async getGroupedTransactions (params?: { pageSize?: number, pageNumber?: number }): Promise<GroupedTransactionsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/group_transactions',
      params: {
        ...(params?.pageSize && { 'page[size]': params?.pageSize }),
        ...(params?.pageNumber && { 'page[number]': params?.pageNumber })
      }
    }) as unknown as GroupedTransactionsResponse
  }

  createIdentity (body: IdentityRequest) {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/identities',
      body
    }).then((response) => {
      return response.data
    })
  }

  getIdentities () {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/identities'
    }).then((response) => {
      return response.data
    })
  }

  getIdentityById (identityID: string) {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/identities/id/${identityID}`
    }).then((response) => {
      return response.data
    })
  }

  updateIdentity (identityID: string, body: any) {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/identities/id/${identityID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  deleteIdentity (identityID: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/identities/id/${identityID}`
    }).then((response) => {
      return response.data
    })
  }

  getLedgers (): Promise<(TransactionLedger | OrderLedger)[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/ledgers'
    }).then((response) => {
      return response.data
    })
  }

  getLedgerById (id: string): Promise<(TransactionLedger | OrderLedger)> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/ledgers/${id}`
    }).then((response) => {
      return response.data
    })
  }

  // TODO Add linked Points
  // getLinkedPoints () {
  //   console.log('linked_points')
  // }

  // TODO Add linked Redemptions
  // getLinkedRedemptions () {
  //   console.log('linked_redemptions')
  // }

  // TODO Add get Points
  // getPoints () {
  //   console.log('points')
  // }

  // TODO Add get Points by ID
  // getPointsByID () {
  //   console.log('points_id')
  // }

  getRegions (): Promise<Region[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/regions'
    }).then((response) => {
      return response.data
    })
  }

  resync () {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/resync'
    }).then((response) => {
      return response.data
    })
  }

  getRewards (): Promise<Reward[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/rewards'
    }).then((response) => {
      return response.data
    })
  }

  getTiers (): Promise<Tier[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/tiers'
    }).then((response) => {
      return response.data
    })
  }

  calculateTiers (): Promise<TierProgress> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/tiers/calculate'
    }).then((response) => {
      return response.data
    })
  }

  assignTier (tierDefinitionHandle: string): Promise<TierProgress> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/tiers/assign',
      body: {
        tier: tierDefinitionHandle
      }
    }).then((response) => {
      return response.data
    })
  }

  // TODO Add get Transaction Products
  // getTransactionProducts () {
  //   console.log('transaction_products')
  // }

  getTransactions (): Promise<Transaction[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transactions'
    }).then((response) => {
      return response.data
    })
  }

  // TODO Add get Transaction Claims by ID
  // getTransactionClaims () {
  //   console.log('transactions_claims')
  // }

  // TODO Add get Transaction Claim by ID
  // getTransationClaimByID () {
  //   console.log('transactions_claims_transactionClaim')
  // }

  getTransactionByID (id: string): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/transactions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  // TODO Add Update Type
  // updateType () {
  //   console.log('update_type')
  // }

  // TODO Ad Custom Event
  // customEvent () {
  //   console.log('custom_event')
  // }

  getComms (): Promise<ProfileComms> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/comms'
    }).then((response) => {
      return response.data
    })
  }

  // TODO Add Dates
  // getDates () {
  //   console.log('attributes_dates')
  // }

  // TODO Add Dates by Attribute
  // getDatesByAttribute () {
  //   console.log('attributes_dates_datesAttribute')
  // }

  getAppearances (): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/appearance'
    }).then((response) => {
      return response.data
    })
  }

  async getCustomAttribute (namespace: string, handle: string): Promise<CustomAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/attributes/custom/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  getCustomAttributes (): Promise<CustomAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/custom'
    }).then((response) => {
      return response.data
    })
  }

  async updateCustomAttribute (namespace: string, handle: string, body: { value?: any, type: string }): Promise<CustomAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/attributes/custom/${namespace}:${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }
  // TODO Add Redeem Benefit
  // redeemBenefit () {
  //   console.log('benefits_benefit_redeem')
  // }

  // Todo Add Redeem
  // redeem () {
  //   console.log('redeem')
  // }

  // TODO Add Get Connection Profile Info
  // getConnectionProfileInfo () {
  //   console.log('connections_connection_profileInfo')
  // }

  // TODO Add Get Transaction List Type
  // getTransactionItemsListType () {
  //   console.log('transactionitems_list_type')
  // }

  // TODO Add Get Transaction Items List Item
  // getTransactionItemsListItem () {
  //   console.log('transactions_items_transactionitem_list_item')
  // }

  // TODO Add Get Grouped Orders
  // getGroupedOrders () {
  //   console.log('group_orders')
  // }
}
