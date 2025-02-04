import { Identity, IdentityInput, Profile, RequestParams } from '../../../types'
import Resource from '../resource'

export default class ProfileIdentities extends Resource {
  get (handle: string): Promise<Identity> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/identities/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<Identity[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/identities',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: IdentityInput): Promise<Identity> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/identities',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (handle: string, body: Partial<IdentityInput>): Promise<Identity> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/identities/${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (handle: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/identities/${handle}`
    }).then((response) => {
      return response?.data
    })
  }

  getByID (id: number): Promise<Identity> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/identities/id/${id}`
    }).then((response) => {
      return response?.data
    })
  }

  updateByID (id: number, body: Partial<IdentityInput>): Promise<Identity> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/identities/id/${id}`,
      body
    }).then((response) => {
      return response?.data
    }) as unknown as Promise<Identity>
  }

  deleteByID (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/identities/id/${id}`
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
