export type PointDefinition = {
  id: number
  name: string
  handle: string
  description: string | null
  notes: string | null
  is_reassignable: boolean
  tags: Array<string>
  created_at: Date
  updated_at: Date
}

export type Point = {
  id: number
  profile_id: string
  linked_profile_id: string | null
  value_initial: number
  value_remaining: number
  issued_at: Date
  expires_at: Date
  definition: PointDefinition
  created_at: Date
  updated_at: Date
  source_type: string
  source: object // Add Point sources type transaction_item
  rate: number | null
  description: string | null
  meta: object | null
}
