import { Omneo } from '..'
import { Identity } from '../types'

async function deleteProfileIdentity (this: Omneo, profileID: string, identityID: string): Promise<Identity> {
  return this.call({
    method: 'delete',
    endpoint: `/profiles/${profileID}/identities/${identityID}`
  }).then((response) => {
    return response.data
  })
}

export default deleteProfileIdentity
