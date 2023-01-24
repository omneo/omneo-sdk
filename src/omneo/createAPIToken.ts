import { Omneo } from '..'
import { APITokenRequest } from '../types'

async function createAPIToken (this: Omneo, body: APITokenRequest): Promise<any> {
  return this.call({
    method: 'post',
    endpoint: '/auth/api-tokens',
    body
  }).then((response) => {
    return response
  })
}

export default createAPIToken
