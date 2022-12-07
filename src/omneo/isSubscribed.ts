import { Omneo } from '..'
import { ProfileComms } from '../types'

function isSubscribed (this: Omneo, comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean {
  if (!prefix) throw Error('No Prefix provided')
  if (comms[`${prefix}_promo`] === false) return false
  if (comms[`${prefix}_optout`] === true) return false
  if (comms[`${prefix}_bounced`] === true) return false
  return true
}

export default isSubscribed
