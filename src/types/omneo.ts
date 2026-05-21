import type { AnyJsonRecord } from './common'

export type OmneoConfig = {}

export type OmneoClassOptions = {
  config?: OmneoConfig
  tenant: string
  token: string
  baseURL?: string
}

export type RequestParams = AnyJsonRecord
export type RequestBody = AnyJsonRecord

export type OmneoRequest = {
  method: string
  endpoint: string
  params?: RequestParams
  body?: RequestBody,
  headers?: { [key: string]: string }
  flattenParams?: boolean
}

export type DelegationData = {
  type: string
  url: string
  enabled: boolean
}
