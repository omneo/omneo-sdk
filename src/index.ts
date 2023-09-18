import { OmneoConfig, OmneoRequest, OmneoClassOptions } from './types/omneo'
import axios, { AxiosResponse } from 'axios'
import Profile from './omneo/resources/profiles/index.js'
import Orders from './omneo/resources/orders/index.js'
import Transactions from './omneo/resources/transactions/index.js'
import Products from './omneo/resources/products/index.js'
import Settings from './omneo/resources/settings/index.js'
import Locations from './omneo/resources/locations/index.js'
import Auth from './omneo/resources/auth/index.js'
import Tenants from './omneo/resources/tenants/index.js'
import Connections from './omneo/resources/connections'

export * from './types'

export class Omneo {
  tenant: string
  token: string
  config: OmneoConfig
  baseURL: string

  constructor (options: OmneoClassOptions) {
    const { config, tenant, token } = options

    this.tenant = tenant
    this.config = config || {}
    this.token = token
    this.baseURL = `https://api.${tenant}.getomneo.com/api/v3`
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

  async call (requestParams: OmneoRequest): Promise<AxiosResponse> {
    const { endpoint, params = {}, method, body = {} } = requestParams
    const queryParams = Object.keys(params).length && new URLSearchParams(params).toString()
    return axios({
      method,
      url: `${this.baseURL}${endpoint}${queryParams ? `?${queryParams}` : ''}`,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      data: body
    }).then((response) => response?.data)
  }
}
