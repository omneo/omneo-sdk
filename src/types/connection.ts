export type Connection = {
  name: string
  connection_definition_id?: number
  connection_definition_handle? : string
  description?: string
  connected_id: string
  connector_id: string
  status: 'draft' | 'pending' | 'accepted' | 'rejected' | 'hold' | 'archived' | 'break'
  disconnected_by?: string
  connected_at?: Date
  disconnected_at?: Date
  is_published?: boolean
  is_archived?: boolean
  is_invalid?: boolean
  sord_order?: number
  meta?: {[key: string]: any}
  notes?: string
}
