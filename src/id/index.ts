import { OmneoRequest } from '../types'
import Auth from '../id/resources/auth'
import Profile from '../id/resources/profile'

export class ID {
  tenant: string
  omneoAPIToken: string
  IDToken: string
  IDTokenExp?: number
  config: { [key: string]: any }
  baseURL: string
  constructor (options: { tenant: string, config: { [key: string]: any }, omneoAPIToken?: string, IDToken?: string, IDTokenExpiry?: number}) {
    const { config, tenant, IDToken, IDTokenExpiry, omneoAPIToken } = options

    this.tenant = tenant
    this.config = config
    this.omneoAPIToken = omneoAPIToken || ''
    this.IDToken = IDToken || ''
    this.baseURL = `https://api.${tenant}.getomneo.com/id/api/v1`
    if (IDTokenExpiry) this.IDTokenExp = IDTokenExpiry
  }

  public auth = new Auth(this)
  public profile = new Profile(this)

  async call (requestParams: OmneoRequest): Promise<any> {
    const { endpoint, params = {}, method, body } = requestParams
    const queryParams = Object.keys(params).length && new URLSearchParams(params).toString()
    const url = `${this.baseURL}${endpoint}${queryParams ? `?${queryParams}` : ''}`

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.IDToken}`
    })

    const response = await fetch(url, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) })
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    try {
      const data = await response.json()
      return data
    } catch {
      return null
    }
  }

  reset () {
    this.IDToken = ''
    this.IDTokenExp = undefined
  }
}
