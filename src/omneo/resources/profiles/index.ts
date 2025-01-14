import {
  CommsChannel,
  DelegationData,
  Profile,
  ProfileComms,
  ProfileResponse,
  Redeem,
  RequestParams,
  ProfileType,
  ProfileBatchMatchCriteria,
  ProfileInput
} from '../../../types'
import ProfileIdentities from './identities'
import ProfileAttributesCustom from './attributes/custom'
import ProfileAttributesDates from './attributes/dates'
import ProfileAttributesComms from './attributes/comms'
import ProfileAttributesAppearance from './attributes/appearance'
import ProfileAggregations from './aggregations'
import ProfileAddresses from './addresses'
import ProfileConnections from './connections'
import ProfileInteractions from './interactions'
import ProfileRewards from './rewards'
import ProfileTransactions from './transactions'
import ProfileBalances from './balances'
import ProfileRegions from './regions'
import ProfileLists from './lists'
import ProfileTiers from './tiers'
import ProfileBenefits from './benefits'

import createProfileByDelegation from '../profiles/createProfileByDelegation.js'
import Resource from '../resource'
export default class Profiles extends Resource {
  identities = new ProfileIdentities(this.client)
  aggregations = new ProfileAggregations(this.client)
  addresses = new ProfileAddresses(this.client)
  connections = new ProfileConnections(this.client)
  interactions = new ProfileInteractions(this.client)
  transactions = new ProfileTransactions(this.client)
  rewards = new ProfileRewards(this.client)
  benefits = new ProfileBenefits(this.client)
  balances = new ProfileBalances(this.client)
  regions = new ProfileRegions(this.client)
  lists = new ProfileLists(this.client)
  tiers = new ProfileTiers(this.client)
  attributes = {
    custom: new ProfileAttributesCustom(this.client),
    dates: new ProfileAttributesDates(this.client),
    comms: new ProfileAttributesComms(this.client),
    appearance: new ProfileAttributesAppearance(this.client)
  }

  get (id: string, params?: RequestParams): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}`,
      params
    }).then((response) => {
      return response.data
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

  resync (id: string): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/resync`
    }).then((response) => {
      return response.data
    })
  }

  sync (updatedAt?: string): Promise<{ message: string }> {
    if (updatedAt) {
      if (isNaN(Date.parse(updatedAt))) return Promise.reject(new Error('Invalid date format'))
      const isBeforeTomorrow = new Date(updatedAt) < new Date(new Date().setDate(new Date().getDate() + 1))
      if (!isBeforeTomorrow) {
        return Promise.reject(new Error('Date must be before tomorrow'))
      }
    }

    return this.client.call({
      method: 'post',
      endpoint: '/profiles/sync',
      body: { updated_at: updatedAt }
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

  checkAvailability (body: { mobile_phone?: string, email?: string }) {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/availability',
      body
    }).then((response) => {
      return response.data
    })
  }

  createByDelegation (body: any, delegation: DelegationData, options: { retryMobileSecondary?: Boolean } = {}) {
    return createProfileByDelegation(this.client, body, delegation, options)
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

  redeem (profileID: string, amount: number, meta?: { [key: string]: unknown }): Promise<Redeem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/redeem`,
      body: { amount, ...(meta && { meta }) }
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

  updateType (profileID: string, type: ProfileType): Promise<Profile> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/update-type`,
      body: { profile_type: type }
    }).then((response) => {
      return response.data
    })
  }

  batch (matchCriteria: ProfileBatchMatchCriteria, profiles: Partial<ProfileInput>[]) {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/batch',
      body: { match_criteria: matchCriteria, profiles }
    })
  }
}
