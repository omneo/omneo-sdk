import { RequestParams } from '../../../types'
import Resource from '../resource'

export default class Settings extends Resource {
  getEnvironment (params?: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: '/settings/environment',
      params
    }).then((response) => {
      return response.data
    })
  }
}
