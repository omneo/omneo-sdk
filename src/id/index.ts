import axios, { AxiosResponse } from 'axios'
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
  constructor (options: { tenant: string, config: { [key: string]: any }, omneoAPIToken?: string, IDToken?: string}) {
    const { config, tenant, IDToken, omneoAPIToken } = options

    this.tenant = tenant
    this.config = config
    this.omneoAPIToken = omneoAPIToken || ''
    this.IDToken = IDToken || ''
    this.baseURL = `https://api.${tenant}.getomneo.com/id/api/v1`
  }

  public auth = new Auth(this)
  public profile = new Profile(this)

  async call (requestParams: OmneoRequest): Promise<AxiosResponse> {
    const { endpoint, params = {}, method, body = {} } = requestParams
    const queryParams = Object.keys(params).length && new URLSearchParams(params).toString()
    return axios({
      method,
      url: `${this.baseURL}${endpoint}${queryParams ? `?${queryParams}` : ''}`,
      headers: {
        Authorization: `Bearer ${this.IDToken}`
      },
      data: body
    }).then((response) => response?.data)
  }

  reset () {
    this.IDToken = ''
  }
}
