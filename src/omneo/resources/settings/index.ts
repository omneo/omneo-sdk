import { RequestQuerySetting, SettingResponse, Setting, RequestCreateSetting, RequestUpdateSetting, SettingEnvironmentResponse } from '@types'
import Resource from '../resource'

export default class Settings extends Resource {
  list (params?: RequestQuerySetting): Promise<SettingResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/settings',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  get (handle: string): Promise<Setting> {
    return this.client.call({
      method: 'GET',
      endpoint: `/settings/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateSetting): Promise<Setting> {
    return this.client.call({
      method: 'POST',
      endpoint: '/settings',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (handle: string, body: RequestUpdateSetting): Promise<Setting> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/settings/${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (handle: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/settings/${handle}`
    }).then((response) => {
      return response
    })
  }

  getEnvironment (): Promise<SettingEnvironmentResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/settings/environment'
    }).then((response) => {
      return response
    })
  }
}
