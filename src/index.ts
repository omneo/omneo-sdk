import { OmneoConfig, OmneoRequest, Profile, Identity, RequestParams, ProfileComms, Transaction, IdentityRequest, Address, AddressUpdateRequest, AddressRequest } from './types'
import axios, { AxiosResponse } from 'axios'

export class Omneo {
  tenant: string
  token: string
  config: OmneoConfig
  baseURL: string
  constructor (tenant: string, token: string, config?: OmneoConfig) {
    this.tenant = tenant
    this.config = config || {}
    this.token = token
    this.baseURL = `https://api.${tenant}.getomneo.com`
  }

  async call (requestParams: OmneoRequest): Promise<AxiosResponse> {
    const { endpoint, params = {}, method, body = {} } = requestParams
    const queryParams = Object.keys(params).length && new URLSearchParams(params).toString()
    return axios({
      method,
      headers: {
        url: `${this.baseURL}${endpoint}${queryParams && `?${queryParams}`}`,
        Authorization: `Bearer ${this.token}`
      },
      data: body
    })
  }

  async getProfileByEmail (email: string, params: RequestParams): Promise<Profile|undefined> {
    return this.call({
      method: 'get',
      endpoint: '/profiles',
      params: { 'filter[email]': email, ...params }
    }).then((response) => {
      return response.data?.[0]
    })
  }

  async getProfileByID (id: string, params: RequestParams): Promise<Profile|undefined> {
    return this.call({
      method: 'get',
      endpoint: `/profiles/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  async getProfileByIdentity (identifier: string, handle: string): Promise<Profile> {
    return this.call({
      method: 'post',
      endpoint: '/profiles/search-id',
      body: { type: handle, id: identifier }
    }).then((response) => {
      return response.data
    })
  }

  findIdentityInProfile (profile: Profile, options: { handle?: string, namespace?: string, identifier?: string }): Identity|undefined {
    const { handle, namespace, identifier } = options
    const identities = profile?.identities
    if (!identities?.length) return

    return identities.find((identity: Identity) => {
      if (handle && identity.handle !== handle) return false
      if (namespace && identity.namespace !== namespace) return false
      if (identifier && identity.identifier !== identifier) return false
      return true
    })
  }

  async checkAvailability (body: { mobile_phone?: string, email?: string }): Promise<any> {
    return this.call({
      method: 'post',
      endpoint: '/profiles/availability',
      body
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

  async getProfile (id: string, params: RequestParams): Promise<Profile> {
    return this.call({
      method: 'get',
      endpoint: `/profiles/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  async createProfile (body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile|undefined> {
    return this.call({
      method: 'post',
      endpoint: '/profiles',
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
      return this.call({
        method: 'post',
        endpoint: '/profiles',
        body: payload
      })
    })
  }

  async updateProfile (id: string, body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile|undefined> {
    return this.call({
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
      return this.call({
        method: 'put',
        endpoint: `/profiles/${id}`,
        body: payload
      })
    })
  }

  async deleteProfile (id: string): Promise<Transaction> {
    return this.call({
      method: 'delete',
      endpoint: `/profiles/${id}`
    }).then((response) => {
      return response.data
    })
  }

  async getTransaction (id: string, params: RequestParams): Promise<Transaction> {
    return this.call({
      method: 'get',
      endpoint: `/transactions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  async createTransaction (body: any): Promise<Transaction> {
    return this.call({
      method: 'post',
      endpoint: '/transactions',
      body
    }).then((response) => {
      return response.data
    })
  }

  async deleteTransaction (id: string): Promise<Transaction> {
    return this.call({
      method: 'post',
      endpoint: `/transactions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  async updateTransaction (id: string, body: any): Promise<Transaction> {
    return this.call({
      method: 'put',
      endpoint: `/transactions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  async createProfileIdentity (profileID: string, body: IdentityRequest): Promise<Identity> {
    return this.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/identities`,
      body
    }).then((response) => {
      return response.data
    })
  }

  async createProfileAddress (profileID: string, body: AddressRequest): Promise<Address> {
    return this.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/addresses`,
      body
    }).then((response) => {
      return response.data
    })
  }

  async updateProfileAddress (profileID: string, addressID: string, body: AddressUpdateRequest): Promise<Address> {
    return this.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  async deleteProfileAddress (profileID: string, addressID: string): Promise<Address> {
    return this.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`
    }).then((response) => {
      return response.data
    })
  }
}
