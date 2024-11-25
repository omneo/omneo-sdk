import { Location } from './location'
import { Profile } from './profile'
import { Transaction } from './transaction'

export type Redemptionitem = {
  id: number
  type: string
  value: number
  count: number
  type_attributes: string
  created_at: string
  updated_at: string
}

export type Redemption = {
  id: number
  profile_id: string
  profile: Pick<Profile, 'first_name' | 'last_name' | 'email' | 'statuses'> & {
    full_name: string
  }
  type: string
  total: number
  total_localised: number
  meta: {[key: string]: any}
  transaction_id?: number
  items: Redemptionitem[]
  created_at: string
  updated_at: string
  redeem_at?: string
  transaction?: Pick<Transaction, 'external_id' | 'receipt_ref' | 'transacted_at' | 'total'> & {
    location?: Pick<Location, 'id' | 'name' | 'external_id'>
  }
}
