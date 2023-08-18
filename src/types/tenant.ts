export type TenantCustomFieldTypes = 'string' | 'integer' | 'float' | 'boolean' | 'json' | 'array'

export type TenantCustomFieldRequest = {
  name: string
  handle: string
  namespace: string
  value: any
  type: TenantCustomFieldTypes
}
