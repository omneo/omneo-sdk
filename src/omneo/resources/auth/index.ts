import { APIToken, APITokenInput } from '../../../types'
import Resource from '../resource.js'

export default class Auth extends Resource {
  createAPIToken (body: APITokenInput): Promise<{ accessToken: string, token: Omit<APIToken, 'client' | 'user'>}> {
    return this.client.call({
      method: 'post',
      endpoint: '/auth/api-tokens',
      body
    }).then((response) => {
      const { client, user, ...token } = response
      return token
    })
  }

  getAPITokens (params: object): Promise<APIToken[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/auth/access-tokens',
      params
    }).then((response) => {
      return response
    })
  }

  deleteAPIToken (id: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/auth/api-tokens/${id}`
    })
  }
}
