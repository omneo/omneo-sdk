import { IdentityResponse, ProfileResponse, RequestQueryIdentity } from '@types'
import Resource from '../resource.js'

export default class Identities extends Resource {
  list (params?: RequestQueryIdentity): Promise<IdentityResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/identities',
      params,
      flattenParams: true
    })
  }

  searchProfile (identifier: string): Promise<ProfileResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/identities/search-profile/${identifier}`
    }).then((response) => {
      return response
    })
  }
}
