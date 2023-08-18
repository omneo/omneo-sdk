import { APITokenRequest } from '../../../types'
import Resource from '../resource.js'

export default class Auth extends Resource {
  createAPIToken (body: APITokenRequest): Promise<any> {
    return this.client.call({
      method: 'post',
      endpoint: '/auth/api-tokens',
      body
    }).then((response) => {
      return response
    })
  }
}
