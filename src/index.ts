import { OmneoConfig, OmneoRequest, OmneoClassOptions } from './types'
import axios, { AxiosResponse } from 'axios'
import omneoFunctions from './omneo'

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

  public checkAvailability = omneoFunctions.checkAvailability.bind(this)
  public createProfile = omneoFunctions.createProfile.bind(this)
  public createProfileAddress = omneoFunctions.createProfileAddress.bind(this)
  public createProfileIdentity = omneoFunctions.createProfileIdentity.bind(this)
  public createTransaction = omneoFunctions.createTransaction.bind(this)
  public deleteProfile = omneoFunctions.deleteProfile.bind(this)
  public deleteProfileAddress = omneoFunctions.deleteProfileAddress.bind(this)
  public deleteProfileIdentity = omneoFunctions.deleteProfileIdentity.bind(this)
  public deleteTransaction = omneoFunctions.deleteTransaction.bind(this)
  public findIdentityInProfile = omneoFunctions.findIdentityInProfile.bind(this)
  public getProfileByEmail = omneoFunctions.getProfileByEmail.bind(this)
  public getProfileByID = omneoFunctions.getProfileByID.bind(this)
  public getProfileByIdentity = omneoFunctions.getProfileByIdentity.bind(this)
  public getProfileLists = omneoFunctions.getProfileLists.bind(this)
  public getTransaction = omneoFunctions.getTransaction.bind(this)
  public isSubscribed = omneoFunctions.isSubscribed.bind(this)
  public isUnsubscribed = omneoFunctions.isUnsubscribed.bind(this)
  public updateProfile = omneoFunctions.updateProfile.bind(this)
  public updateProfileAddress = omneoFunctions.updateProfileAddress.bind(this)
  public updateTransaction = omneoFunctions.updateTransaction.bind(this)
  public listProfiles = omneoFunctions.listProfiles.bind(this)
  public listTransactions = omneoFunctions.listTransactions.bind(this)
  public getProfilePoints = omneoFunctions.getProfilePoints.bind(this)
  public queueTransaction = omneoFunctions.queueTransaction.bind(this)

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
