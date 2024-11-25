export type APITokenInput = {
  name: string
  scopes: Array<string>
}

export type Client = {
  id: number
  user_id: number | null
  name: string
  provider: string | null
  redirect: string
  personal_access_client: boolean
  password_client: boolean
  revoked: boolean
  created_at: string
  updated_at: string
}

export type User = {
  id: number
  name: string
  email: string
  throttle: any | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export type APIToken = {
  id: string
  user_id: number
  client_id: number
  name: string
  scopes: Array<string>
  revoked: boolean
  created_at: string
  updated_at: string
  expires_at: string
  client: Client
  usage: Array<any>
  user: User
}
