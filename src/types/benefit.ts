import BenefitDefinition from "./benefit-definition";

export type Benefit = {
    id: number
    profile_id: string
    external_id: string
    expires_at: string
    issued_at: string
    is_expired: boolean
    is_redeemable: boolean
    redemptions_remaining: number,
    total_global_redemptions_remaining: number,
    definition: BenefitDefinition,
    timezone: string
    claimed_at: string | null
    meta: {[key: string]: any} | null,
    redeem_code_pos: string | null
    redeem_code_online: string | null
    created_at: string
    updated_at: string
}

export default Benefit;
