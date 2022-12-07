import { Omneo } from '..'
import { ProfileComms } from '../types'

function isUnsubscribed (this: Omneo, comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean {
  if (!prefix) throw Error('No Prefix provided')
  if (comms[`${prefix}_promo`] === false) return true
  if (comms[`${prefix}_optout`] === true) return true
  if (comms[`${prefix}_bounced`] === true) return true
  return false
}

export default isUnsubscribed
