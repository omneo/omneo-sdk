import { OmneoConfig, OmneoRequest, OmneoClassOptions } from '../types/omneo'
import Profile from './resources/profiles/index.js'
import Orders from './resources/orders/index.js'
import Transactions from './resources/transactions/index.js'
import Products from './resources/products/index.js'
import Settings from './resources/settings/index.js'
import Locations from './resources/locations/index.js'
import Auth from './resources/auth/index.js'
import AchievementDefinitions from './resources/achievement-definitions/index.js'
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
import Rewards from './resources/rewards'
import RewardDefinitions from './resources/reward-definitions'
import Benefits from './resources/benefits'
import BenefitDefinitions from './resources/benefit-definitions'
import CreditDefinitions from './resources/credit-definitions'
import Credits from './resources/credits'
import ListDefinitions from './resources/list-definitions'
import Webhooks from './resources/webhooks'
import Roles from './resources/roles'
import Targets from './resources/targets'
import Statuses from './resources/statuses'
import Systems from './resources/systems'
import Tags from './resources/tags'
import Users from './resources/users'
import Brands from './resources/brands'
import Triggers from './resources/triggers'
import PointDefinitions from './resources/point-definitions'
import TierDefinitions from './resources/tier-definitions'
import TierPoints from './resources/tier-points'

import health from './resources/health'
import Staffs from './resources/staffs'
import Shares from './resources/shares'
import SavedFilters from './resources/saved-filters'
import RoleDefinitions from './resources/role-definitions'
import Reminders from './resources/reminder'
import Redemptions from './resources/redemptions'
import Ratings from './resources/ratings'
import Rates from './resources/rates'
import Organisations from './resources/organisations'
import Lists from './resources/lists'
import Imports from './resources/imports'
import Departments from './resources/departments'
import CustomProducts from './resources/custom-products'
import CustomFields from './resources/custom-fields'
import ConnectionDefinitions from './resources/connection-definitions'
import Batches from './resources/batches'
import Automations from './resources/automations'
import Allocations from './resources/allocations'
import ActionHistories from './resources/action-histories'
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

  public achievementDefinitions = new AchievementDefinitions(this)
  public actionHistories = new ActionHistories(this)
  public allocations = new Allocations(this)
  public audits = new Audits(this)
  public auth = new Auth(this)
  public automations = new Automations(this)
  public batches = new Batches(this)
  public benefitDefinitions = new BenefitDefinitions(this)
  public benefits = new Benefits(this)
  public brands = new Brands(this)

  public connectionDefinitions = new ConnectionDefinitions(this)
  public connections = new Connections(this)
  public countries = new Countries(this)
  public creditDefinitions = new CreditDefinitions(this)
  public credits = new Credits(this)
  public currencies = new Currency(this)
  public customFields = new CustomFields(this)
  public customProducts = new CustomProducts(this)
  public departments = new Departments(this)
  public identities = new Identities(this)
  public imports = new Imports(this)
  public interactions = new Interactions(this)

  public listDefinitions = new ListDefinitions(this)
  public lists = new Lists(this)
  public locations = new Locations(this)
  public orders = new Orders(this)
  public organisations = new Organisations(this)
  public permissions = new Permission(this)
  public pointDefinitions = new PointDefinitions(this)
  public points = new Points(this)
  public products = new Products(this)
  public profiles = new Profile(this)

  public rates = new Rates(this)
  public ratings = new Ratings(this)
  public redemptions = new Redemptions(this)
  public regions = new Regions(this)
  public reminders = new Reminders(this)
  public rewardDefinitions = new RewardDefinitions(this)
  public rewards = new Rewards(this)
  public roleDefinitions = new RoleDefinitions(this)
  public roles = new Roles(this)

  public saveFilters = new SavedFilters(this)
  public settings = new Settings(this)
  public shares = new Shares(this)
  public staffs = new Staffs(this)
  public statuses = new Statuses(this)
  public systems = new Systems(this)

  public tags = new Tags(this)
  public targets = new Targets(this)
  public tenants = new Tenants(this)
  public tierDefinitions = new TierDefinitions(this)
  public tierPoints = new TierPoints(this)
  public transactions = new Transactions(this)
  public triggers = new Triggers(this)
  public users = new Users(this)
  public webhooks = new Webhooks(this)

  public health = health.bind(this)

  async call (requestParams: OmneoRequest): Promise<any> {
    const { endpoint, params = {}, method, body, headers: requestHeaders, flattenParams = false } = requestParams
    const flatParams = flattenParams ? this.flattenParams(params) : params
    const queryParams = Object.keys(flatParams).length && new URLSearchParams(flatParams).toString()
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

  private flattenParams (obj: Record<string, any>, prefix = ''): Record<string, string> {
    return Object.keys(obj).reduce((acc: Record<string, string>, key) => {
      const fullKey = prefix ? `${prefix}[${key}]` : key
      const val = obj[key]
      if (val !== null && val !== undefined) {
        if (typeof val === 'object' && !Array.isArray(val)) {
          Object.assign(acc, this.flattenParams(val, fullKey))
        } else {
          acc[fullKey] = String(val)
        }
      }
      return acc
    }, {})
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
