import { Identity, IdentityInput, Profile, RequestParams } from '../../../types'
import Resource from '../resource'

export default class ProfileIdentities extends Resource {
  get (profileID: string, handle: string): Promise<Identity> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/identities/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<Identity[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/identities`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (profileID: string, body: IdentityInput): Promise<Identity> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/identities`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, handle: string, body: Partial<IdentityInput>): Promise<Identity> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/identities/${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, handle: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/identities/${handle}`
    }).then((response) => {
      return response?.data
    })
  }

  findInProfile (profile: Profile, options: { handle?: string, identifier?: string, findLatest?: boolean }): Identity|undefined {
    const { handle, identifier, findLatest } = options
    const identities = profile?.identities
    if (!identities?.length) return

    const filteredIdentities = identities.filter((identity: Identity) => {
      if (handle && identity.handle !== handle) return false
      if (identifier && identity.identifier !== identifier) return false
      return true
    })

    if (!findLatest) return filteredIdentities?.[0]
    return filteredIdentities.sort((identityA, identityB) => {
      return new Date(identityB.created_at).getTime() - new Date(identityA.created_at).getTime()
    })?.[0]
  }
}
