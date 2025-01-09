export type Aggregations = {
    profile_id: string
    shop_days: number
    spend_12m: number
    spend_12m_now: string | null
    spend_all: number
    spend_atv_12m: number
    spend_atv_all: number
    discount_avg: number
    spend_first_date: string | null
    spend_last_date: string | null
    dimension_frequency: 'F0' | 'F1' | 'F2' | 'FL' | 'FH'
    /*
      dimension_frequency
      * F0 - never shopped
      * F1 - 1 order ever
      * F2 - 2 order ever
      * FL - > 30d between orders (+3 lifetime)
      * FH - < 30d between orders (+3 lifetime)
    */
    dimension_recency: 'RR' | 'RL' | 'RI' | 'RA' | 'RC'
    /*
      dimension_recency
      * RR last shop >= 60 months ago
      * RL last shop >= 24 months ago and less than 60 months ago
      * RI last shop >= 12 months ago and less than 24 months ago
      * RA last shop>= 6 months ago and less than 12 months ago
      * RS last shop >= 3 months ago and less than 6 months ago
      * RC If none of the above are true
    */
    dimension_join: 'JN' | 'JC' | `J${number}`
    /*
      dimension_join
        * JN Join New (where join string is less than or equal to 90 days ago)
        * JC Join Current (where join string is less than or equal to 365 days ago)
        * J1 (effectively represents 1 year, where join string is greater than 365 days [1yr] but less or equal to 730 days
        * [2yrs]) J2 (effectively represents 2 years, where join string is greater than 730 days [2yrs] but less or equal to
        * 1095 days [3yrs] etc per year anniversary
    */
    channel: 'CO' | 'CF' | 'CM'
    /*
     channel (aggregate transaction 'systems' handles)
     * CO Has transacted both 'pos' and 'web' transactions
     * CM Has only transacted 'web' transactions
     * CF Has only transacted 'pos' transactions
    */
    shop_count: number
    store_join: Location | null
    likely_country: string
    likely_country_score: number
    purchased_brands: Array<String>
    total_shop_days: number | null
    first_shop_days: number | null
    second_shop_days: number | null
    latest_shop_days: number | null
    average_shop_days: number | null
    second_shop_date: number | null
    previous_shop_date: number | null
    at_risk_date: string | null
    most_transacted_location: Location | null
    latest_shop_spend: number | null
    latest_shop_currency: string | null
    latest_transacted_location: Location | null
    transacted_locations: string | null
    likely_country_iso: string | null
    likely_country_iso_score: string | null
    likely_state_iso: string | null
    likely_state_iso_score: number | null
    likely_region: string | null
    likely_region_score: number | null
}
