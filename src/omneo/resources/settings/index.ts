import { RequestParams, Setting, SettingInput } from '../../../types'
import Resource from '../resource'

export default class Settings extends Resource {
  // Not Paginated
  list (params?: RequestParams): Promise<Setting[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/settings',
      params
    }).then((response) => {
      return response.data
    })
  }

  get (handle: string): Promise<Setting> {
    return this.client.call({
      method: 'get',
      endpoint: `/settings/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  update (handle: string, body: SettingInput): Promise<Setting> {
    return this.client.call({
      method: 'put',
      endpoint: `/settings/${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  // API Errors on delete, cannot use this
  // delete (handle: string, body: SettingInput): Promise<Setting> {
  //   return this.client.call({
  //     method: 'put',
  //     endpoint: `/settings/${handle}`,
  //     body
  //   }).then((response) => {
  //     return response.data
  //   })
  // }

  getEnvironment (params?: RequestParams): Promise<{ handle: string, value: any }[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/settings/environment',
      params
    }).then((response) => {
      return response.data
    })
  }
}
