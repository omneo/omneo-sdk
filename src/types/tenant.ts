export type TenantCustomFieldTypes = 'string' | 'integer' | 'float' | 'boolean' | 'json' | 'array'

export type TenantCustomFieldRequest = {
  name: string
  handle: string
  namespace: string
  value: any
  type: TenantCustomFieldTypes
}

export type TriggerCustomEventExcluded =
  | 'profile.updated'
  | 'profile.created'
  | 'profile.deleted'
  | 'profile.merged'
  | 'aggregation.updated'

export type TriggerCustomEvent = {
  event: Exclude<string, TriggerCustomEventExcluded>
  context?: { [key: string]: any } | null
}
