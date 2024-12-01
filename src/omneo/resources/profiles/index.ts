import {
  Address, AddressInput, AddressUpdateInput, Aggregations, CommsChannel,
  Connection, CustomAttribute, DelegationData, GetConnectionInputParams, GroupedTransactionsResponse, Identity, IdentityRequest, Interaction, InteractionInput, List, ListInput, ListItem, ListItemInput, OrderLedger, Profile, ProfileAppearance,
  ProfileBalances, ProfileComms, ProfileResponse, Redeem, Region, RequestParams, Reward,
  TierProgress,
  Transaction,
  TransactionFilters,
  TransactionLedger
} from '../../../types'
import createProfileByDelegation from '../profiles/createProfileByDelegation.js'
import Resource from '../resource'

export default class Profiles extends Resource {
  get (id: string, params?: RequestParams): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  findByIdentity (identifier: string, handle: string): Promise<Profile> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/search-id',
      body: { type: handle, id: identifier }
    }).then((response) => {
      return response.data
    })
  }

  findByEmail (email: string, params?: RequestParams): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles',
      params: { 'filter[email]': email, ...params }
    }).then((response: any) => {
      return response.data?.[0]
    })
  }

  list (params?: RequestParams): Promise<ProfileResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles',
      params
    }).then((response: any) => {
      return response
    })
  }

  update (id: string, body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${id}`,
      body
    }).then((response) => {
      return response.data
    }).catch(async (error) => {
      if (error?.status !== 422 || !error?.body?.errors?.mobile_phone) {
        return Promise.reject(error)
      }
      if (!options.retryMobileSecondary) return

      const payload = { ...body }
      payload.secondary_phone = payload.mobile_phone
      delete payload.mobile_phone
      return this.client.call({
        method: 'put',
        endpoint: `/profiles/${id}`,
        body: payload
      })
    })
  }

  delete (id: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${id}`
    }).then((response) => {
      return response.data
    })
  }

  purge (id: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${id}/purge`
    })
  }

  resync (id: string): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/resync`
    }).then((response) => {
      return response.data
    })
  }

  checkAvailability (body: { mobile_phone?: string, email?: string }) {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/availability',
      body
    }).then((response) => {
      return response.data
    })
  }

  create (body: any, options: { retryMobileSecondary?: Boolean } = {}) {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles',
      body
    }).then((response) => {
      return response.data
    }).catch(async (error) => {
      if (error?.response?.status !== 422 || !error?.response?.data?.errors?.mobile_phone) {
        return Promise.reject(error)
      }
      if (!options.retryMobileSecondary) return

      const payload = { ...body }
      payload.secondary_phone = payload.mobile_phone
      delete payload.mobile_phone
      return this.client.call({
        method: 'post',
        endpoint: '/profiles',
        body: payload
      }).then((response) => {
        return response.data
      })
    })
  }

  async createByDelegation (body: any, delegation: DelegationData, options: { retryMobileSecondary?: Boolean } = {}) {
    return createProfileByDelegation(this.client, body, delegation, options)
  }

  createIdentity (profileID: string, body: IdentityRequest) {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/identities`,
      body
    }).then((response) => {
      return response.data
    })
  }

  getIdentities (profileID: string, params: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/identities`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getIdentityById (profileID: string, identityID: string) {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/identities/${identityID}`
    }).then((response) => {
      return response.data
    })
  }

  updateIdentity (profileID: string, identityID: string, body: any) {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/identities/id/${identityID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  deleteIdentity (profileID: string, identityID: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/identities/id/${identityID}`
    }).then((response) => {
      return response.data
    })
  }

  createInteraction (body: InteractionInput) {
    return this.client.call({
      method: 'post',
      endpoint: '/interactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  createAddress (profileID: string, body: AddressInput): Promise<Address> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/addresses`,
      body
    }).then((response) => {
      return response.data
    })
  }

  deleteAddress (profileID: string, addressID: string): Promise<Address> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`
    }).then((response) => {
      return response.data
    })
  }

  updateAddress (profileID: string, addressID: string, body: AddressUpdateInput): Promise<Address> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  findIdentityInProfile (profile: Profile, options: { handle?: string, identifier?: string, findLatest?: boolean }): Identity|undefined {
    const { handle, identifier, findLatest } = options
    const identities = profile?.identities
    if (!identities?.length) return

    const filteredIdentities = identities.filter((identity: Identity) => {
      if (handle && identity.handle !== handle) return false
      if (identifier && identity.identifier !== identifier) return false
      return true
    })

    if (!findLatest) return filteredIdentities?.[0]
    return filteredIdentities.sort((identityA, identityB) => {
      return new Date(identityB.created_at).getTime() - new Date(identityA.created_at).getTime()
    })?.[0]
  }

  getRewards (profileID: string, params: object): Promise<Reward[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/rewards`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getPoints (profileID: string, params: object): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/points`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getInteractions (profileID: string, params: object): Promise<Interaction[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/interactions`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getComms (id: string, params?: RequestParams): Promise<ProfileComms> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/attributes/comms`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getBalances (profileID: string, params: object): Promise<ProfileBalances> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/balances`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getAppearances (id: string, params?: RequestParams): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/attributes/appearance`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getAggregations (id: string, params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/aggregations`,
      params
    }).then((response) => {
      return response.data
    })
  }

  calculateAggregations (id: string, params?: RequestParams): Promise<Aggregations> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/aggregations/calculate`,
      params
    }).then((response) => {
      return response.data
    })
  }

  isSubscribed (comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean {
    if (!prefix) throw Error('No Prefix provided')
    if (comms[`${prefix}_promo`] === false) return false
    if (comms[`${prefix}_optout`] === true) return false
    if (comms[`${prefix}_bounced`] === true) return false
    return true
  }

  isUnsubscribed (comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean {
    if (!prefix) throw Error('No Prefix provided')
    if (comms[`${prefix}_promo`] === false) return true
    if (comms[`${prefix}_optout`] === true) return true
    if (comms[`${prefix}_bounced`] === true) return true
    return false
  }

  subscribe (profileID: string, channel: CommsChannel): Promise<ProfileComms> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/comms`,
      body: {
        [`${channel}_optout`]: false,
        [`${channel}_promo`]: true
      }
    }).then((response: any) => {
      return response.data?.[0]
    })
  }

  unsubscribe (profileID: string, channel: CommsChannel, options: {toggleOptOut: boolean}): Promise<ProfileComms> {
    const body = {
      [`${channel}_promo`]: false
    }

    if (options.toggleOptOut) body[`${channel}_optout`] = true

    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/comms`,
      body
    }).then((response: any) => {
      return response.data?.[0]
    })
  }

  async redeem (profileID: string, amount: number): Promise<Redeem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/redeem`,
      body: { amount }
    }).then((response) => {
      return response.data
    })
  }

  async getConnections (profileID: string, params?: GetConnectionInputParams): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections`,
      params
    }).then((response) => {
      return response.data
    })
  }

  async getConnectionByID (profileID: string, connectionID: number): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections/${connectionID}`
    }).then((response) => {
      return response.data
    })
  }

  async getConnectionProfileInfo (profileID: string, connectionID: number): Promise<Partial<Profile>> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections/${connectionID}/profileInfo`
    }).then((response) => {
      return response.data
    })
  }

  async getCustomAttribute (profileID: string, namespace: string, handle: string): Promise<CustomAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/custom/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  getCustomAttributes (id: string): Promise<CustomAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/attributes/custom`
    }).then((response) => {
      return response.data
    })
  }

  async updateCustomAttribute (profileID: string, namespace: string, handle: string, body: { value?: any, type: string }): Promise<CustomAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/attributes/custom/${namespace}:${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  async getProfileDates (profileID: string): Promise<any> { // TODO Add Profile Dates Type
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/dates`
    }).then((response) => {
      return response.data
    })
  }

  getTransactions (profileID: string, params: object): Promise<Array<Transaction> | []> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getTransactionByID (profileID: string, transactionID: string): Promise<Transaction> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions/${transactionID}`
    }).then((response) => {
      return response.data
    })
  }

  findTransactions (profileID: string, filter: { field: TransactionFilters, value: string }) {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/find-transactions`,
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

  async getGroupedTransactions (profileID: string, params?: { pageSize?: number, pageNumber?: number }): Promise<GroupedTransactionsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/group_transactions`,
      ...(params?.pageSize && { 'page[size]': params?.pageSize }),
      ...(params?.pageNumber && { 'page[number]': params?.pageNumber })
    }) as unknown as GroupedTransactionsResponse
  }

  getLedgers (profileID: string): Promise<(TransactionLedger | OrderLedger)[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/ledgers`
    }).then((response) => {
      return response.data
    })
  }

  getLedgerById (profileID: string, ledgerID: string): Promise<(TransactionLedger | OrderLedger)> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/ledgers/${ledgerID}`
    }).then((response) => {
      return response.data
    })
  }

  getRegions (id: string): Promise<Region[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/regions`
    }).then((response) => {
      return response.data
    })
  }

  calculateTiers (id: string): Promise<TierProgress> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/tiers/calculate`
    }).then((response) => {
      return response.data
    })
  }

  assignTier (profileID: string, tierDefinitionHandle: string): Promise<TierProgress> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/tiers/assign`,
      body: {
        tier: tierDefinitionHandle
      }
    }).then((response) => {
      return response.data
    })
  }

  merge (sourceProfileID: string, destinationProfileId: string): Promise<Profile> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/merge',
      body: {
        source_profile_id: sourceProfileID,
        destination_profile_id: destinationProfileId
      }
    }).then((response) => {
      return response.data
    })
  }

  getLists (profileID: string, params?: object): Promise<List[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getListByID (profileID: string, listID: string): Promise<List> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  createList (profileID: ListInput) {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists`
    }).then((response) => {
      return response.data
    })
  }

  deleteList (profileID: string, listID: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  getListItems (profileID: string, listID: number, params?: object): Promise<ListItem[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/items`,
      params
    }).then((response) => {
      return response.data
    })
  }

  getListItemByID (profileID: string, listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  updateListItem (profileID: string, listID: number, listItemID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  createListItem (profileID: string, listID: number, listItemID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  deleteListItem (profileID: string, listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  updateList (profileID: string, listID: string, body: Partial<ListInput>): Promise<List> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/lists/${listID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  getUnassignedTransactionItems (profileID: string, params?: { include_list_item: 1 | 0}) {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactionitems/list/unassigned`,
      params
    }).then((response) => {
      return response.data
    })
  }
}
