export type PointDefinition = {
  id: number
  name: string
  handle: string
  description: string | null
  notes: string | null
  is_reassignable: boolean
  tags: Array<string>
  created_at: string
  updated_at: string
}

export type Point = {
  id: number
  profile_id: string
  linked_profile_id: string | null
  value_initial: number
  value_remaining: number
  issued_at: string
  expires_at: string
  definition: PointDefinition
  created_at: string
  updated_at: string
  source_type: string
  source: object // Add Point sources type transaction_item
  rate: number | null
  description: string | null
  meta: object | null
}
