import { IdentityWithProfile, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Identities extends Resource {
  list (params?: RequestParams): Promise<Array<IdentityWithProfile>> {
    return this.client.call({
      method: 'get',
      endpoint: '/identities',
      params
    }).then((response) => {
      if (params && params.withPagination) {
        return response
      }
      return response.data
    })
  }
}
