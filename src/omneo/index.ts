import { OmneoConfig, OmneoRequest, OmneoClassOptions } from '../types/omneo'
import Profile from './resources/profiles/index.js'
import Orders from './resources/orders/index.js'
import Transactions from './resources/transactions/index.js'
import Products from './resources/products/index.js'
import Settings from './resources/settings/index.js'
import Locations from './resources/locations/index.js'
import Auth from './resources/auth/index.js'
import Tenants from './resources/tenants/index.js'
import Connections from './resources/connections'
import Identities from './resources/identities'
import Interactions from './resources/interactions'
import Audits from './resources/audits'
import Currency from './resources/currencies'
import Permission from './resources/permissions'
import Points from './resources/points'
import Countries from './resources/countries'
import Regions from './resources/regions'
import RewardsDefinition from './resources/rewards-definition'
import Webhooks from './resources/webhooks'

export class Omneo {
  tenant: string
  token: string
  config: OmneoConfig
  baseURL: string

  constructor (options: OmneoClassOptions) {
    const { config, tenant, token, baseURL } = options

    this.tenant = tenant
    this.config = config || {}
    this.token = token
    this.baseURL = baseURL || `https://api.${tenant}.getomneo.com/api/v3`
  }

  public profiles = new Profile(this)
  public orders = new Orders(this)
  public transactions = new Transactions(this)
  public products = new Products(this)
  public settings = new Settings(this)
  public locations = new Locations(this)
  public auth = new Auth(this)
  public tenants = new Tenants(this)
  public connections = new Connections(this)
  public interactions = new Interactions(this)
  public identities = new Identities(this)
  public audits = new Audits(this)
  public currencies = new Currency(this)
  public permissions = new Permission(this)
  public points = new Points(this)
  public countries = new Countries(this)
  public regions = new Regions(this)
  public rewardsDefinition = new RewardsDefinition(this)
  public webhooks = new Webhooks(this)

  async call (requestParams: OmneoRequest): Promise<any> {
    const { endpoint, params = {}, method, body, headers: requestHeaders } = requestParams
    const queryParams = Object.keys(params).length && new URLSearchParams(params).toString()
    const url = `${this.baseURL}${endpoint}${queryParams ? `?${queryParams}` : ''}`

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
      ...(requestHeaders && { ...requestHeaders })
    })

    const response = await fetch(url, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) })
    })

    const data = await this.returnResponse(response)
    if (!response.ok || response.status < 200 || response.status >= 300) {
      return Promise.reject(data)
    }

    return data || null
  }

  private async returnResponse (response: any) {
    if (typeof response.json === 'function') {
      try {
        return await response.json()
      } catch {
        return response
      }
    }
    return response
  }
}
