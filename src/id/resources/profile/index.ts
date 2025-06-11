import {
  CommsChannel,
  Profile,
  ProfileComms,
  Redeem,
  ProfileType,
  RequestParams,
  TransactionProductVariantsResponse
} from '../../../types'

import ProfileAddresses from './addresses'
import ProfileAggregations from './aggregations'
import ProfileAttributesAppearance from './attributes/appearance'
import ProfileAttributesComms from './attributes/comms'
import ProfileAttributesCustom from './attributes/custom'
import ProfileAttributesDates from './attributes/dates'
import ProfileBalances from './balances'
import ProfileBenefits from './benefits'
import ProfileConnections from './connections'
import ProfileIdentities from './identities'
import ProfileInteractions from './interactions'
import ProfileLedgers from './ledgers'
import ProfileLists from './lists'
import ProfilePoints from './points'
import ProfileRegions from './regions'
import ProfileRewards from './rewards'
import ProfileTiers from './tiers'
import ProfileTransactions from './transactions'
import ProfileTransactionClaims from './transaction-claims'
import Resource from '../resource'
export default class OmneoProfile extends Resource {
  addresses = new ProfileAddresses(this.client)
  aggregations = new ProfileAggregations(this.client)
  attributes = {
    custom: new ProfileAttributesCustom(this.client),
    dates: new ProfileAttributesDates(this.client),
    comms: new ProfileAttributesComms(this.client),
    appearance: new ProfileAttributesAppearance(this.client)
  }

  balances = new ProfileBalances(this.client)
  benefits = new ProfileBenefits(this.client)
  connections = new ProfileConnections(this.client)
  identities = new ProfileIdentities(this.client)
  interactions = new ProfileInteractions(this.client)
  ledgers = new ProfileLedgers(this.client)
  lists = new ProfileLists(this.client)
  points = new ProfilePoints(this.client)
  regions = new ProfileRegions(this.client)
  rewards = new ProfileRewards(this.client)
  tiers = new ProfileTiers(this.client)
  transactionClaims = new ProfileTransactionClaims(this.client)
  transactions = new ProfileTransactions(this.client)

  get (): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me'
    }).then((response) => {
      return response.data
    }).catch((error) => {
      console.error('get profile error', error)
      return Promise.reject(error)
    })
  }

  update (body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me',
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
        endpoint: '/profiles/me',
        body: payload
      })
    })
  }

  delete (): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: '/profiles/me'
    }).then((response) => {
      return response.data
    })
  }

  purge () {
    return this.client.call({
      method: 'delete',
      endpoint: '/profiles/me/purge'
    })
  }

  resync (): Promise<Profile> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/resync'
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

  subscribe (channel: CommsChannel): Promise<ProfileComms> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/comms',
      body: {
        [`${channel}_optout`]: false,
        [`${channel}_promo`]: true
      }
    }).then((response: any) => {
      return response.data?.[0]
    })
  }

  unsubscribe (channel: CommsChannel, options: {toggleOptOut: boolean}): Promise<ProfileComms> {
    const body = {
      [`${channel}_promo`]: false
    }

    if (options.toggleOptOut) body[`${channel}_optout`] = true

    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/comms',
      body
    }).then((response: any) => {
      return response.data?.[0]
    })
  }

  redeem (amount: number): Promise<Redeem> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/redeem',
      body: { amount }
    }).then((response) => {
      return response.data
    })
  }

  updateType (type: ProfileType): Promise<Profile> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/update-type',
      body: { profile_type: type }
    }).then((response) => {
      return response.data
    })
  }

  transactionProducts (params?: RequestParams): Promise<TransactionProductVariantsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transaction-products',
      params
    })
  }

  Connection (connectionID: number): OmneoProfile {
    const Conn = new OmneoProfile(this.client)
    const clonedCall = Conn.client.call.bind(this.client)
    Conn.client.call = async (options) => {
      options.endpoint = options.endpoint.replace('/profiles/me', `/profiles/connection/${connectionID}`)
      return clonedCall(options)
    }
    return Conn
  }
}
