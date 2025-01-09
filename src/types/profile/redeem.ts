import { ProfileBalances } from './balances'

export type Redeem = {
    id: number
    profile_id: string
    total_localised: number
    total: number
    balances: ProfileBalances
    meta: { [key: string]: any }
    created_at: string
    updated_at: string
}
