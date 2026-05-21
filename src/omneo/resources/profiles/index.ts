import { CommsChannel, DelegationData, Profile, ProfileCommsAttribute, ProfileResponse, RequestParams, UpdateProfileProfileTypeEnum, TransactionProductVariantResponse, RequestExistsProfileRequest, RequestTriggerCustomEvent } from '@types'
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
import ProfileRedemptions from './redemptions'
import ProfileOrders from './orders'
import ProfileTransactions from './transactions'
import ProfileTransactionClaims from './transaction-claims'
import ProfileAchievements from './achievements'
import ProfileBalances from './balances'
import ProfileRegions from './regions'
import ProfileLists from './lists'
import ProfileTiers from './tiers'
import ProfileBenefits from './benefits'
import ProfileCredits from './credits'

import createProfileByDelegation from '../profiles/createProfileByDelegation.js'
import Resource from '../resource'
import ProfilePoints from './points'
import ProfileLedgers from './ledgers'
export default class Profiles extends Resource {
  achievements = new ProfileAchievements(this.client)
  addresses = new ProfileAddresses(this.client)
  aggregations = new ProfileAggregations(this.client)
  attributes = {
    appearance: new ProfileAttributesAppearance(this.client),
    comms: new ProfileAttributesComms(this.client),
    custom: new ProfileAttributesCustom(this.client),
    dates: new ProfileAttributesDates(this.client)
  }

  balances = new ProfileBalances(this.client)
  benefits = new ProfileBenefits(this.client)
  connections = new ProfileConnections(this.client)
  credits = new ProfileCredits(this.client)
  identities = new ProfileIdentities(this.client)
  interactions = new ProfileInteractions(this.client)
  ledgers = new ProfileLedgers(this.client)
  lists = new ProfileLists(this.client)

  orders = new ProfileOrders(this.client)
  points = new ProfilePoints(this.client)
  redemptions = new ProfileRedemptions(this.client)
  regions = new ProfileRegions(this.client)
  rewards = new ProfileRewards(this.client)
  tiers = new ProfileTiers(this.client)
  transactionClaims = new ProfileTransactionClaims(this.client)
  transactions = new ProfileTransactions(this.client)

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
      const errors = error?.errors || error?.body?.errors
      const isMobileError = Array.isArray(errors?.mobile_phone) && errors.mobile_phone.find((e: string) => e === 'The phone number exists')

      if (!isMobileError || !options.retryMobileSecondary) {
        return Promise.reject(error)
      }

      const payload = { ...body }
      payload.secondary_phone = payload.mobile_phone
      delete payload.mobile_phone
      return this.client.call({
        method: 'put',
        endpoint: `/profiles/${id}`,
        body: payload
      }).then((response) => {
        return response.data
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
      const errors = error?.errors
      const isMobileError = Array.isArray(errors?.mobile_phone) && errors.mobile_phone.find((e: string) => e === 'The phone number exists')
      if (!isMobileError || !options.retryMobileSecondary) {
        return Promise.reject(error)
      }

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

  exists (body: RequestExistsProfileRequest): Promise<{ data: { id: string} }> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/exists',
      body
    }).then((response) => {
      return response.data
    })
  }

  createByDelegation (body: any, delegation: DelegationData, options: { retryMobileSecondary?: Boolean } = {}) {
    return createProfileByDelegation(this.client, body, delegation, options)
  }

  isSubscribed (comms: ProfileCommsAttribute, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean {
    if (!prefix) throw Error('No Prefix provided')
    if (comms[`${prefix}_promo`] === false) return false
    if (comms[`${prefix}_optout`] === true) return false
    if (comms[`${prefix}_bounced`] === true) return false
    return true
  }

  isUnsubscribed (comms: ProfileCommsAttribute, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean {
    if (!prefix) throw Error('No Prefix provided')
    if (comms[`${prefix}_promo`] === false) return true
    if (comms[`${prefix}_optout`] === true) return true
    if (comms[`${prefix}_bounced`] === true) return true
    return false
  }

  subscribe (profileID: string, channel: CommsChannel): Promise<ProfileCommsAttribute> {
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

  unsubscribe (profileID: string, channel: CommsChannel, options: {toggleOptOut: boolean}): Promise<ProfileCommsAttribute> {
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

  redeem (profileID: string, amount: number, meta?: { [key: string]: unknown }): Promise<any> {
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

  updateType (profileID: string, type: UpdateProfileProfileTypeEnum): Promise<Profile> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/update-type`,
      body: { profile_type: type }
    }).then((response) => {
      return response.data
    })
  }

  batch (matchCriteria: { field: string, value: string, operator?: string }[], profiles: Partial<Profile>[]) {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/batch',
      body: { match_criteria: matchCriteria, profiles }
    })
  }

  transactionProducts (profileID: string, params?: RequestParams): Promise<TransactionProductVariantResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transaction-products`,
      params
    })
  }

  triggerCustomEvent (profileId: string, body: RequestTriggerCustomEvent) : Promise<Profile> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileId}/custom-event`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
