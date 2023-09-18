import {
  Address, AddressRequest, AddressUpdateRequest, CommsChannel,
  Connection, DelegationData, Identity, IdentityRequest, Interaction, InteractionRequest, Profile, ProfileAppearance,
  ProfileBalances, ProfileComms, Redeem, RequestParams, Reward
} from '../../../types'
import Resource from '../resource'
import createProfileByDelegation from '../profiles/createProfileByDelegation.js'

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

  list (params?: RequestParams): Promise<Profile[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles',
      params
    }).then((response: any) => {
      return response.data
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

  deleteIdentity (profileID: string, identityID: string) {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/identities/id/${identityID}`
    }).then((response) => {
      return response.data
    })
  }

  updateIdentity (profileID: string, identityID: string, payload: any) {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/identities/id/${identityID}`
    }).then((response) => {
      return response.data
    })
  }

  createInteraction (body: InteractionRequest) {
    return this.client.call({
      method: 'post',
      endpoint: '/interactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  createAddress (profileID: string, body: AddressRequest): Promise<Address> {
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

  updateAddress (profileID: string, addressID: string, body: AddressUpdateRequest): Promise<Address> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  findIdentityInProfile (profile: Profile, options: { handle?: string, identifier?: string }): Identity|undefined {
    const { handle, identifier } = options
    const identities = profile?.identities
    if (!identities?.length) return

    return identities.find((identity: Identity) => {
      if (handle && identity.handle !== handle) return false
      if (identifier && identity.identifier !== identifier) return false
      return true
    })
  }

  getRewards (profileID: string, params: object): Promise<Reward> {
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

  getLists (profileID: string, params: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists`,
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

  async getConnections (profileID: string): Promise<Connection> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections`
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

  async getConnectedProfileData (profileID: string, connectionID: number): Promise<Partial<Profile>> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/connections/${connectionID}/profileInfo`
    }).then((response) => {
      return response.data
    })
  }
}
