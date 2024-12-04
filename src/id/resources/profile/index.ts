import { Profile as ProfileType, Aggregations, Connection, CustomAttribute, GroupedTransactionsResponse, IdentityRequest, Interaction, OrderLedger, ProfileAppearance, ProfileBalances, ProfileComms, Region, RequestParams, Reward, Tier, TierProgress, Transaction, TransactionFilters, TransactionLedger, ConnectionInput, GetConnectionInputParams, InteractionInput, List, ListInput, ListItem, ListItemInput, ProfileDatesAttribute } from '../../../types'
import IDResource from '../resource'
export default class Profile extends IDResource {
  get (): Promise<ProfileType> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me'
    }).then(({ data }) => data)
  }

  update (body: Profile): Promise<ProfileType> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me',
      body
    }).then(({ data }) => data)
  }

  delete (): Promise<ProfileType> {
    return this.client.call({
      method: 'delete',
      endpoint: '/profiles/me'
    })
  }

  purge () {
    return this.client.call({
      method: 'delete',
      endpoint: '/profiles/me/purge'
    })
  }

  getInteractions (params?: object): Promise<Interaction[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/interactions',
      params
    })
  }

  getInteractionById (id: string): Promise<Interaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/interactions/${id}`
    })
  }

  updateInteraction (id: string): Promise<Interaction> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/interactions/${id}`
    })
  }

  createInteraction (body: InteractionInput): Promise<Interaction> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/interactions',
      body
    })
  }

  deleteInteraction (id: string): Promise<Interaction> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/interactions/${id}`
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

  findTransactions (filter: { field: TransactionFilters, value: string }): Promise<Transaction | null> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/find-transactions',
      params: {
        [`filter[${filter.field}]`]: filter.value
      }
    }).then((response) => {
      return response?.data
    }).catch((error) => {
      if (error?.status === 404) return null
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

  getRewards (params?: object): Promise<Reward[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/rewards',
      params
    }).then((response) => {
      return response.data
    })
  }

  getTiers (params?: object): Promise<Tier[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/tiers',
      params
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

  getDates (): Promise<ProfileDatesAttribute[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/dates'
    }).then((response) => {
      return response.data
    })
  }

  deleteDate (dateId: string): Promise<ProfileDatesAttribute[]> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/attributes/dates/${dateId}`
    }).then((response) => {
      return response.data
    })
  }

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

  getConnections (params?: GetConnectionInputParams): Promise<Connection[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/connections',
      params
    }).then((response) => {
      return response.data
    })
  }

  getConnectionByID (connectionID: string): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  createList (body: ListInput): Promise<List> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/lists',
      body
    }).then((response) => {
      return response.data
    })
  }

  getLists (params?: object): Promise<List[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/lists',
      params
    }).then((response) => {
      return response.data
    })
  }

  getListByID (listID: string): Promise<List> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  deleteList (listID: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  getListItems (listID: number, params?: object): Promise<ListItem[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/items`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getListItemByID (listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  updateListItem (listID: number, listItemID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  linkTransactionItemToList (transactionItemID: number, body: { product_list_item_id: number, type: 'link' }): Promise<ListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profile/transactions/items/${transactionItemID}/list-item`,
      body
    }).then((response) => {
      return response.data
    })
  }

  createListItem (listID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/lists/${listID}/items`,
      body
    }).then((response) => {
      return response.data
    })
  }

  deleteListItem (listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  updateList (listID: string, body: Partial<ListInput>): Promise<List> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/lists/${listID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  createConnection (body: ConnectionInput): Promise<Connection> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/connections',
      body
    }).then((response) => {
      return response.data
    })
  }

  updateConnection (connectionID: string): Promise<Connection> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  deleteConnection (connectionID: string): Promise<Connection> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  Connection (connectionID: number): Profile {
    const Conn = new Profile(this.client)
    const clonedCall = Conn.client.call.bind(this.client)
    Conn.client.call = async (options) => {
      options.endpoint = options.endpoint.replace('/profiles/me', `/profiles/connection/${connectionID}`)
      return clonedCall(options)
    }
    return Conn
  }

  getUnassignedTransactionItems (params?: { include_list_item: 1 | 0}) {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transactionitems/list/unassigned',
      params
    }).then((response) => {
      return response.data
    })
  }

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
