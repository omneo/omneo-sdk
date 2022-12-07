import { Omneo } from '..'
import { Profile, Identity } from '../types'

function findIdentityInProfile (this: Omneo, profile: Profile, options: { handle?: string, namespace?: string, identifier?: string }): Identity|undefined {
  const { handle, namespace, identifier } = options
  const identities = profile?.identities
  if (!identities?.length) return

  return identities.find((identity: Identity) => {
    if (handle && identity.handle !== handle) return false
    if (namespace && identity.namespace !== namespace) return false
    if (identifier && identity.identifier !== identifier) return false
    return true
  })
}

export default findIdentityInProfile
