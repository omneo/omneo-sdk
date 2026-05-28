// Route category: profile

export type BatchAggregationJsonItem = {
  at_risk_date?: string | null
  average_shop_days?: number | null
  channel?: string | null
  dimension_frequency?: string | null
  dimension_join?: string | null
  dimension_recency?: string | null
  discount_avg?: number | null
  first_shop_days?: number | null
  latest_shop_currency_id?: number | null
  latest_shop_days?: number | null
  latest_shop_spend?: number | null
  latest_transacted_location_id?: number | null
  likely_country?: string | null
  likely_country_iso?: string | null
  likely_country_iso_score?: number | null
  likely_country_score?: number | null
  likely_region?: string | null
  likely_region_score?: number | null
  likely_state_iso?: string | null
  likely_state_iso_score?: number | null
  most_spend_12m_location_id?: number | null
  most_spend_location_id?: number | null
  previous_shop_date?: string | null
  profile_id: string
  purchased_brands?: string[] | null
  second_shop_date?: string | null
  second_shop_days?: number | null
  shop_count?: number | null
  shop_days?: number | null
  spend_12m?: number | null
  spend_12m_now?: number | null
  spend_all?: number | null
  spend_atv_12m?: number | null
  spend_atv_all?: number | null
  spend_first_date?: string | null
  spend_last_date?: string | null
  top_historic_status_id?: number | null
  total_shop_days?: number | null
  transacted_locations?: string[] | null
}

export type BatchCustomAttributeJsonProfilesItemCustomAttributesItem = {
  handle: string
  namespace: string
  type?: string | null
  value: string
}

export type BatchRegionJsonProfilesItem = {
  country?: string | null
  profile_id: string
  region: string
  state?: string | null
}

export type BatchStatusJsonProfilesItem = {
  profile_id: string
  statuses: string[]
}

export type BatchTagJsonProfilesItem = {
  profile_id: string
  tags: string[]
}

export type ProfileAggregationBatchJsonResponse = {
  message: string
}

export type ProfileStatusBatchJsonUpdateResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type ProfileStatusBatchJsonDeleteResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type ProfileTagBatchJsonUpdateResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type ProfileTagBatchJsonDeleteResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type ProfileCustomAttributeBatchJsonUpdateResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type ProfileRegionBatchJsonUpdateResponse = {
  data: {
    message: string
    batch_id: string
  }
}

export type RequestBatchAggregationJson = {
  aggregations: BatchAggregationJsonItem[] | null
}

export type BatchCustomAttributeJsonProfilesItem = {
  custom_attributes: BatchCustomAttributeJsonProfilesItemCustomAttributesItem[] | null
  profile_id: string
}

export type RequestBatchRegionJson = {
  profiles: BatchRegionJsonProfilesItem[] | null
}

export type RequestBatchStatusJson = {
  profiles: BatchStatusJsonProfilesItem[]
}

export type RequestBatchTagJson = {
  profiles: BatchTagJsonProfilesItem[]
}

export type RequestBatchCustomAttributeJson = {
  profiles: BatchCustomAttributeJsonProfilesItem[] | null
}
