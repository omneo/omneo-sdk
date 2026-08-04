import { Benefit } from './benefit'
import { Credit } from './credit'
import { Currency } from './currencies'
import { Location } from './location'
import { PaginationResponse } from './pagination'
import { Point } from './point'
import { ProfileBalances } from './profile/balances'
import { Profile } from './profile'
import { Reward } from './reward'
import { Transaction } from './transaction'

export type RedemptionType = 'reward' | 'point' | 'benefit' | 'credit' | string

export type Redemptionitem = {
  id: number
  type: RedemptionType | null
  value: number | null
  count: number | null
  type_attributes: Reward | Point | Benefit | Credit
  created_at: string
  updated_at: string
}

export type RedemptionItemResponse = PaginationResponse & {
  data: Redemptionitem[]
}

export type Redemption = {
  id: number
  profile_id: string
  profile: Pick<Profile, 'first_name' | 'last_name' | 'full_name' | 'email' | 'statuses'> & {
    full_name: string
  }
  type: string | null
  total: number
  total_localised: number
  meta: {[key: string]: any} | null
  location_id?: number | null
  location?: Pick<Location, 'id' | 'type' | 'name' | 'description' | 'phone' | 'email' | 'external_id' | 'is_published' | 'is_permanently_closed' > | null
  transaction_id?: number | null
  items: Redemptionitem[]
  created_at: string
  updated_at: string
  redeem_at?: string | null
  transaction?: Pick<Transaction, 'external_id' | 'receipt_ref' | 'transacted_at' | 'total'> & {
    location?: Pick<Location, 'id' | 'name' | 'external_id'>
  } | null
}

export type RedemptionResponse = PaginationResponse & {
  data: Redemption
}

export type SuccessfulRedemption = {
  id: number
  profile_id: string
  total_localised: number
  total: number
  location_id?: number | null
  location?: Pick<Location, 'id' | 'type' | 'name' | 'description' | 'phone' | 'email' | 'external_id' | 'is_published' | 'is_permanently_closed'> | null
  currency?: Currency | null
  balances: ProfileBalances
  meta: { [key: string]: any } | null
  transaction_external_id: string | null
  transaction_receipt_ref: string | number | null
  created_at: string
  updated_at: string
}
