import { CreateOrganisationInput, Organisation, OrganisationResponse, RequestParams, UpdateOrganisationInput } from '@types'
import Resource from '../resource.js'
import OrganisationProfiles from './profiles/index.js'

export default class Organisations extends Resource {
  profiles = new OrganisationProfiles(this.client)

  list (params?: RequestParams): Promise<OrganisationResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/organisations',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<Organisation> {
    return this.client.call({
      method: 'GET',
      endpoint: `/organisations/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateOrganisationInput): Promise<Organisation> {
    return this.client.call({
      method: 'POST',
      endpoint: '/organisations',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateOrganisationInput): Promise<Organisation> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/organisations/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
