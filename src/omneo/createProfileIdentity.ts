import { Omneo } from '..'
import { IdentityRequest, Identity } from '../types'

async function createProfileIdentity (this: Omneo, profileID: string, body: IdentityRequest): Promise<Identity> {
  return this.call({
    method: 'post',
    endpoint: `/profiles/${profileID}/identities`,
    body
  }).then((response) => {
    return response.data
  })
}

export default createProfileIdentity
