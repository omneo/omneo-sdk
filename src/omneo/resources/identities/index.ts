import { IdentityResponse, Profile, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Identities extends Resource {
  list (params?: RequestParams): Promise<IdentityResponse> {
    const { withPagination, ...reqParams }: RequestParams = params || {}
    return this.client.call({
      method: 'get',
      endpoint: '/identities',
      params: reqParams
    })
  }

  searchProfile (identifier: string): Promise<Profile[] | []> {
    return this.client.call({
      method: 'get',
      endpoint: `/identities/search-profile/${identifier}`
    }).then((response) => {
      return response.data
    })
  }
}
