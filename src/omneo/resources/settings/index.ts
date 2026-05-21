import { RequestParams, Setting } from '@types'
import Resource from '../resource'

export default class Settings extends Resource {
  // Not Paginated
  list (params?: RequestParams): Promise<Setting[]> {
    return this.client.call({
      method: 'GET',
      endpoint: '/settings',
      params
    }).then((response) => {
      return response.data
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

  create (body: Setting): Promise<Setting> {
    return this.client.call({
      method: 'POST',
      endpoint: '/settings',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (handle: string, body: Setting): Promise<Setting> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/settings/${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (handle: string, body: Setting): Promise<Setting> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/settings/${handle}`,
      body
    }).then((response) => {
      return response
    })
  }

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
