export type CustomAttribute = {
  id?: number
  profile_id?: string
  namespace: string
  handle: string
  type: 'json' | 'integer' | 'string' | 'boolean'
  value: any
  created_at?: string
  updated_at?: string
}

export type ProfileCustomAttributesResponse = {
  data: CustomAttribute[]
}

export type CustomAttributeInput = {
  namespace: string
  handle: string
  type: 'string' | 'integer' | 'float' | 'boolean' | 'json' | 'array',
  value: string | number | boolean | object | any[]
}
