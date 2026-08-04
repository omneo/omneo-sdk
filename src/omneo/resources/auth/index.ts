import { APIToken, APITokenInput, APITokenResponse, RequestParams } from '@types'
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

  getAPITokens (params?: RequestParams): Promise<APITokenResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/auth/access-tokens',
      params
    })
  }

  deleteAPIToken (id: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/auth/api-tokens/${id}`
    })
  }

  verifyToken () {
    return this.client.call({
      method: 'get',
      endpoint: '/auth/verify'
    })
  }
}
