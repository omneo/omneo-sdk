export type OmneoConfig = {}

export type OmneoClassOptions = {
  config?: OmneoConfig
  tenant: string
  token: string
  baseURL?: string
}

export type RequestParams = {[key: string]: any}
export type RequestBody = {[key: string]: any}
export type OmneoRequest = {
  method: string
  endpoint: string
  params?: RequestParams
  body?: RequestBody,
  headers?: {[key: string]: string}
}

export type DelegationData = {
  type: string
  url: string
  enabled: boolean
}
