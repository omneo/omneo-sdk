import { OmneoConfig, OmneoRequest, OmneoClassOptions } from '../types/omneo'
import axios, { AxiosResponse } from 'axios'
import Profile from './resources/profiles/index.js'
import Orders from './resources/orders/index.js'
import Transactions from './resources/transactions/index.js'
import Products from './resources/products/index.js'
import Settings from './resources/settings/index.js'
import Locations from './resources/locations/index.js'
import Auth from './resources/auth/index.js'
import Tenants from './resources/tenants/index.js'
import Connections from './resources/connections'
import Interactions from './resources/interactions'

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
