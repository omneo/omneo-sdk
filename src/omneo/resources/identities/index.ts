import { IdentityResponse, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Identities extends Resource {
  list (params?: RequestParams): Promise<IdentityResponse> {
    const { withPagination, ...reqParams }: RequestParams = params || {}
    return this.client.call({
      method: 'get',
      endpoint: '/identities',
      params: reqParams
    }).then((response) => {
      if (params && params.withPagination) {
        return response
      }
      return response.data
    })
  }
}
