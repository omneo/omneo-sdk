import type { Redemption } from '../redemptions'
export type RedemptionProfile = {
  first_name: string | null
  last_name: string | null
  full_name: string | null
  email: string
  statuses: string[]
}

export type ProfileRedemptionLinkedResponse = {
  data: Redemption[]
}

export type ProfileRedemptionCountResponse = {
  data: {
    count: number
  }
}
