export type System = {
  id: number
  handle: string
  created_at: string
  updated_at: string
}

export type SystemInput = {
  handle: System['handle']
}

export type SystemResponse = {
  data: System[]
}
